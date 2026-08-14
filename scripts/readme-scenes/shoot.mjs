/**
 * Render the README images from the real components.
 *
 *   npm run readme:assets
 *
 * Self-contained: esbuild bundles src/ into a throwaway IIFE (React included,
 * so there is nothing to vendor), a tiny static server hosts it, and Playwright
 * screenshots each scene at 2x into docs/assets/. Nothing here depends on the
 * design-sync output, so a fresh clone can regenerate the images.
 */
import { chromium } from 'playwright';
import * as esbuild from 'esbuild';
import path from 'node:path';
import fs from 'node:fs/promises';
import os from 'node:os';
import http from 'node:http';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..', '..');
const out = path.join(root, 'docs', 'assets');
const tmp = await fs.mkdtemp(path.join(os.tmpdir(), 'ins-readme-'));
await fs.mkdir(out, { recursive: true });

// ONE bundle exposing the DS *and* its React. Building React separately gives
// two copies in the page, and the components' hooks then run against a
// different React than the renderer — "Invalid hook call".
await esbuild.build({
  stdin: {
    contents: `
      export * from './src/index.ts';
      import * as React from 'react';
      import * as ReactDOMClient from 'react-dom/client';
      export { React, ReactDOMClient };`,
    resolveDir: root,
    loader: 'ts',
  },
  bundle: true,
  format: 'iife',
  globalName: 'Insighture',
  outfile: path.join(tmp, 'ds.js'),
  loader: { '.woff2': 'dataurl' },
  jsx: 'automatic',
  logLevel: 'error',
});

const SCENES = [
  { scene: 'hero', name: 'hero' },
  { scene: 'palette', name: 'palette' },
  { scene: 'components', name: 'components-light', theme: 'light' },
  { scene: 'components', name: 'components-dark', theme: 'dark' },
];

const shell = (scene) => `<!doctype html><html><head><meta charset="utf-8">
<link rel="stylesheet" href="/ds.css">
<script src="/ds.js"></script>
<script src="/_boot.js"></script>
<style>html,body{margin:0}#root{display:inline-block}.scene{padding:48px;box-sizing:border-box}</style>
</head><body><div id="root"></div><script src="/${scene}.js"></script></body></html>`;

const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css' };
const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://x');
  const name = url.pathname.replace(/^\/+/, '');
  if (url.pathname.endsWith('.html')) {
    res.writeHead(200, { 'content-type': 'text/html' });
    return res.end(shell(name.replace('.html', '')));
  }
  for (const dir of [tmp, here]) {
    try {
      const body = await fs.readFile(path.join(dir, name));
      res.writeHead(200, { 'content-type': MIME[path.extname(name)] ?? 'application/octet-stream' });
      return res.end(body);
    } catch {}
  }
  res.writeHead(404).end('not found');
});
await new Promise((r) => server.listen(0, '127.0.0.1', r));
const base = `http://127.0.0.1:${server.address().port}`;

const browser = await chromium.launch();
const ctx = await browser.newContext({ deviceScaleFactor: 2, viewport: { width: 1400, height: 900 } });
const page = await ctx.newPage();
page.on('pageerror', (e) => console.error('  [pageerror]', e.message));

for (const { scene, name, theme } of SCENES) {
  const q = theme ? `?theme=${theme}` : '';
  await page.goto(`${base}/${scene}.html${q}`, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(250);
  const el = await page.$('.scene');
  if (!el) throw new Error(`scene "${scene}" rendered nothing — check the console`);
  await el.screenshot({ path: path.join(out, `${name}.png`) });
  const box = await el.boundingBox();
  console.log(`docs/assets/${name}.png  ${Math.round(box.width)}x${Math.round(box.height)} @2x`);
}

await browser.close();
server.close();
await fs.rm(tmp, { recursive: true, force: true });
