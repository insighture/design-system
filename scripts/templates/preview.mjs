/**
 * Render the template gallery images shown in the README, from the REAL
 * generated files (not mock-ups).
 *
 *   npm run templates:preview
 *
 * Needs LibreOffice (to render .pptx/.docx) and Poppler's `pdftoppm`, plus the
 * brand fonts installed (static DM Sans + DM Serif Display) so LibreOffice
 * doesn't substitute them. If LibreOffice can't see your installed fonts, point
 * INS_FONT_DIR at a folder of the .ttf files and they're loaded into a private
 * LibreOffice profile for the render.
 *
 * Run `npm run templates` first; this only reads templates/.
 */
import { execFileSync } from 'node:child_process';
import fs from 'node:fs/promises';
import { existsSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { chromium } from 'playwright';
import { outDir, page, root } from './lib.mjs';

const soffice = [process.env.SOFFICE, '/Applications/LibreOffice.app/Contents/MacOS/soffice', 'soffice']
  .find((p) => p && (p === 'soffice' || existsSync(p)));
const run = (cmd, args) => execFileSync(cmd, args, { stdio: 'pipe' });
try { run('pdftoppm', ['-v']); } catch (e) { if (e.code === 'ENOENT') throw new Error('pdftoppm not found — install Poppler (brew install poppler).'); }

const tmp = await fs.mkdtemp(path.join(os.tmpdir(), 'ins-preview-'));
const profile = path.join(tmp, 'lo-profile');
if (process.env.INS_FONT_DIR) {
  await fs.mkdir(path.join(profile, 'user', 'fonts'), { recursive: true });
  for (const f of await fs.readdir(process.env.INS_FONT_DIR)) {
    if (/\.(ttf|otf)$/i.test(f)) await fs.copyFile(path.join(process.env.INS_FONT_DIR, f), path.join(profile, 'user', 'fonts', f));
  }
}

/** Office file → PDF in tmp (LibreOffice), returns the PDF path. */
function toPdf(file) {
  run(soffice, [`-env:UserInstallation=${pathToFileURL(profile).href}`, '--headless', '--convert-to', 'pdf', '--outdir', tmp, file]);
  return path.join(tmp, path.basename(file).replace(/\.\w+$/, '.pdf'));
}
/** One PDF page → PNG, returns the PNG path. */
function pagePng(pdf, n, name, dpi = 110) {
  const base = path.join(tmp, name);
  run('pdftoppm', ['-png', '-r', String(dpi), '-f', String(n), '-l', String(n), '-singlefile', pdf, base]);
  return `${base}.png`;
}

const T = (p) => path.join(outDir, p);
const deck = toPdf(T('powerpoint/Insighture-sample.pptx'));
const word = toPdf(T('word/Insighture-report-sample.docx'));
const slides = [1, 4, 5, 6, 3, 8].map((n) => pagePng(deck, n, `slide-${n}`, 90));
const docs = [
  pagePng(word, 1, 'word-1'), pagePng(word, 2, 'word-2'),
  pagePng(T('pdf/Insighture-report.pdf'), 2, 'pdf-report-2'), pagePng(T('pdf/Insighture-one-pager.pdf'), 1, 'pdf-one'),
];

const browser = await chromium.launch();
// The email, screenshotted at desktop width.
const emailShot = path.join(tmp, 'email.png');
{
  const p = await browser.newPage({ viewport: { width: 680, height: 900 } });
  await p.goto(pathToFileURL(T('email/newsletter.html')).href);
  await p.evaluate(() => document.fonts.ready);
  await p.screenshot({ path: emailShot, fullPage: true });
  await p.close();
}

const url = (f) => pathToFileURL(f).href;
const css = `body{background:var(--ins-neutral-100)} .g{display:grid;gap:22px;padding:36px}
  img{display:block;width:100%;border-radius:10px;box-shadow:0 1px 3px rgba(21,24,26,.12),0 8px 24px rgba(21,24,26,.08);background:#fff}
  .cap{font-size:13px;color:var(--ins-neutral-600);margin:8px 2px 0}`;
const fig = (src, cap, style = '') => `<figure style="margin:0;${style}"><img src="${url(src)}" alt=""><p class="cap">${cap}</p></figure>`;

const shots = [
  {
    file: 'templates-slides.png', w: 1400, h: 640,
    html: page(`<div class="g" style="grid-template-columns:repeat(3,1fr)">${slides.map((s, i) =>
      fig(s, ['Title', 'Card grid', 'Big number', 'Native chart', 'Section', 'Quote'][i])).join('')}</div>`, css),
  },
  {
    file: 'templates-documents.png', w: 1400, h: 1010,
    html: page(`<div class="g" style="grid-template-columns:repeat(4,1fr)">
      ${fig(docs[0], 'Word report · cover')}${fig(docs[1], 'Word report · page')}${fig(docs[2], 'PDF report')}${fig(docs[3], 'PDF one-pager')}
    </div>
    <div class="g" style="grid-template-columns:1.9fr 1fr 0.8fr 1.05fr;padding-top:0;align-items:start">
      ${fig(T('social/linkedin-1200x627.png'), 'LinkedIn card')}${fig(T('social/quote-1080x1080.png'), 'Quote card')}
      ${fig(T('social/stat-1080x1350.png'), 'Stat card')}
      <figure style="margin:0"><div style="height:262px;overflow:hidden;border-radius:10px;box-shadow:0 1px 3px rgba(21,24,26,.12),0 8px 24px rgba(21,24,26,.08)"><img src="${url(emailShot)}" alt="" style="box-shadow:none;border-radius:0"></div><p class="cap">Email newsletter</p></figure>
    </div>`, css),
  },
];

for (const { file, w, h, html } of shots) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 2 });
  const p = await ctx.newPage();
  const src = path.join(tmp, `${file}.html`);
  await fs.writeFile(src, html);
  await p.goto(pathToFileURL(src).href);
  await p.evaluate(() => document.fonts.ready);
  const height = await p.evaluate(() => document.body.scrollHeight);
  const out = path.join(root, 'docs', 'assets', file);
  await p.screenshot({ path: out, clip: { x: 0, y: 0, width: w, height } });
  console.log(`docs/assets/${file}  ${w}x${height} @2x`);
  await ctx.close();
}
await browser.close();
await fs.rm(tmp, { recursive: true, force: true });
