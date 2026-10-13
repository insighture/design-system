/**
 * Shared helpers for `npm run templates`.
 *
 * Everything the templates use — colours, fonts, type sizes — is read from
 * src/tokens.ts and src/styles/, so the Office files, PDFs and images can never
 * drift from the design system. Nothing here is published with the package.
 */
import * as esbuild from 'esbuild';
import { chromium } from 'playwright';
import JSZip from 'jszip';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
export const root = path.resolve(here, '..', '..');
export const outDir = path.join(root, 'templates');
export const assetDir = path.join(outDir, 'assets');
export const fontsCss = pathToFileURL(path.join(root, 'src/styles/fonts.css')).href;
export const tokensCss = pathToFileURL(path.join(root, 'src/styles/tokens.css')).href;

/** src/tokens.ts, bundled on the fly — no `npm run build` needed first. */
export async function loadTokens() {
  const { outputFiles } = await esbuild.build({
    entryPoints: [path.join(root, 'src/tokens.ts')],
    bundle: true,
    format: 'esm',
    write: false,
    logLevel: 'error',
  });
  const url = 'data:text/javascript;base64,' + Buffer.from(outputFiles[0].text).toString('base64');
  return import(url);
}

/** '#EE4065' → 'EE4065' (Office wants bare hex). */
export const hex = (c) => c.replace('#', '').toUpperCase();

let browserPromise;
const browser = () => (browserPromise ??= chromium.launch());
export const closeBrowser = async () => browserPromise && (await (await browserPromise).close());

/** Wrap a body fragment in a page that has the brand fonts and tokens loaded. */
export const page = (body, css = '') => `<!doctype html><html><head><meta charset="utf-8">
<link rel="stylesheet" href="${fontsCss}"><link rel="stylesheet" href="${tokensCss}">
<style>html,body{margin:0;padding:0}body{font-family:var(--ins-font-sans);-webkit-font-smoothing:antialiased}${css}</style>
</head><body>${body}</body></html>`;

async function open(html, width, height, scale = 1) {
  const ctx = await (await browser()).newContext({ viewport: { width, height }, deviceScaleFactor: scale });
  const p = await ctx.newPage();
  // Load from a file:// URL so the relative font URLs in fonts.css resolve.
  const tmp = path.join(outDir, `.render-${process.pid}-${Math.random().toString(36).slice(2)}.html`);
  await fs.writeFile(tmp, html);
  await p.goto(pathToFileURL(tmp).href);
  await p.evaluate(() => document.fonts.ready);
  return { p, done: async () => { await ctx.close(); await fs.rm(tmp, { force: true }); } };
}

/** Render HTML to a PNG of exactly width × height CSS px. */
export async function png(html, width, height, file, scale = 2) {
  const { p, done } = await open(html, width, height, scale);
  await fs.mkdir(path.dirname(file), { recursive: true });
  await p.screenshot({ path: file, clip: { x: 0, y: 0, width, height } });
  await done();
}

/** Render an HTML file (with @page CSS) to a PDF, fonts embedded. */
export async function pdf(htmlFile, file) {
  const ctx = await (await browser()).newContext();
  const p = await ctx.newPage();
  await p.goto(pathToFileURL(htmlFile).href);
  await p.evaluate(() => document.fonts.ready);
  await fs.mkdir(path.dirname(file), { recursive: true });
  await p.pdf({ path: file, preferCSSPageSize: true, printBackground: true });
  await ctx.close();
}

/**
 * Turn a .pptx/.docx into its template twin (.potx/.dotx). The only difference
 * on disk is the main part's content type.
 */
export async function toTemplate(src, dest) {
  const zip = await JSZip.loadAsync(await fs.readFile(src));
  const ct = await zip.file('[Content_Types].xml').async('string');
  const swapped = ct
    .replace('presentationml.presentation.main+xml', 'presentationml.template.main+xml')
    .replace('wordprocessingml.document.main+xml', 'wordprocessingml.template.main+xml');
  if (swapped === ct) throw new Error(`${src}: no main content type to swap`);
  zip.file('[Content_Types].xml', swapped);
  await fs.writeFile(dest, await zip.generateAsync({ type: 'nodebuffer', compression: 'DEFLATE' }));
}

const SLOTS = ['dk1', 'lt1', 'dk2', 'lt2', 'accent1', 'accent2', 'accent3', 'accent4', 'accent5', 'accent6', 'hlink', 'folHlink'];

/** The Office colour scheme + font scheme, as DrawingML. */
export function themeParts(officeTheme, name = 'Insighture') {
  const clr = `<a:clrScheme name="${name}">` +
    SLOTS.map((k) => `<a:${k}><a:srgbClr val="${hex(officeTheme[k])}"/></a:${k}>`).join('') +
    '</a:clrScheme>';
  const font = (f) => `<a:latin typeface="${f}"/><a:ea typeface=""/><a:cs typeface=""/>`;
  const fonts = `<a:fontScheme name="${name}"><a:majorFont>${font(officeTheme.majorFont)}</a:majorFont>` +
    `<a:minorFont>${font(officeTheme.minorFont)}</a:minorFont></a:fontScheme>`;
  return { clr, fonts };
}

/** Write the brand colour + font scheme into every theme part of an OOXML file. */
export async function applyTheme(file, officeTheme, name = 'Insighture') {
  const zip = await JSZip.loadAsync(await fs.readFile(file));
  const { clr, fonts } = themeParts(officeTheme, name);
  const parts = Object.keys(zip.files).filter((f) => /\/theme\/theme\d+\.xml$/.test(f));
  if (!parts.length) throw new Error(`${file}: no theme part`);
  for (const part of parts) {
    let xml = await zip.file(part).async('string');
    xml = xml
      .replace(/<a:clrScheme\b[\s\S]*?<\/a:clrScheme>/, () => clr)
      .replace(/<a:fontScheme\b[\s\S]*?<\/a:fontScheme>/, () => fonts)
      .replace(/(<a:theme\b[^>]*?\bname=")[^"]*"/, (_, h) => `${h}${name}"`);
    zip.file(part, xml);
  }
  await fs.writeFile(file, await zip.generateAsync({ type: 'nodebuffer', compression: 'DEFLATE' }));
}

/**
 * Repair two things pptxgenjs gets wrong when a placeholder is filled with
 * several styled runs:
 *  - it repeats <a:pPr> before every run, which is invalid after the first run
 *    (PowerPoint offers to "repair" the file);
 *  - it copies the placeholder's bold onto every run, so serif-emphasis words
 *    render faux-bold. DM Serif Display has one weight; force b="0" on it.
 */
export async function fixPptxRuns(file, serifFont) {
  const zip = await JSZip.loadAsync(await fs.readFile(file));
  const pPr = /<a:pPr\b[^>]*\/>|<a:pPr\b[^>]*>[\s\S]*?<\/a:pPr>/g;
  for (const name of Object.keys(zip.files).filter((f) => /^ppt\/(slides|slideLayouts)\/[^/]+\.xml$/.test(f))) {
    let xml = await zip.file(name).async('string');
    xml = xml.replace(/<a:p>([\s\S]*?)<\/a:p>/g, (whole, inner) => {
      const first = inner.indexOf('<a:r>');
      if (first < 0) return whole;
      return `<a:p>${inner.slice(0, first)}${inner.slice(first).replace(pPr, '')}</a:p>`;
    });
    xml = xml.replace(new RegExp(`<a:rPr([^>]*)>((?:(?!</a:rPr>)[\\s\\S])*?typeface="${serifFont}")`, 'g'),
      (_, attrs, rest) => `<a:rPr${attrs.replace(/\bb="1"/, 'b="0"')}>${rest}`);
    zip.file(name, xml);
  }
  await fs.writeFile(file, await zip.generateAsync({ type: 'nodebuffer', compression: 'DEFLATE' }));
}
