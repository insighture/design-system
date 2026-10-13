/**
 * Build every brand template into templates/.
 *
 *   npm run templates            # everything
 *   npm run templates -- pptx    # just some: assets pptx docx pdf email social
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { buildAssets } from './assets.mjs';
import { closeBrowser, loadTokens, outDir, root } from './lib.mjs';

const only = new Set(process.argv.slice(2));
const want = (k) => only.size === 0 || only.has(k);

const tokens = await loadTokens();
await fs.mkdir(outDir, { recursive: true });

const assets = await buildAssets(tokens);
const built = [];
try {
  if (want('pptx')) built.push(...Object.values(await (await import('./pptx.mjs')).buildPptx(tokens, assets)));
  if (want('docx')) built.push(...Object.values(await (await import('./docx.mjs')).buildDocx(tokens, assets)));
  if (want('pdf')) built.push(...Object.values(await (await import('./pdf.mjs')).buildPdf(tokens)));
  if (want('email')) built.push(...Object.values(await (await import('./email.mjs')).buildEmail(tokens)));
  if (want('social')) built.push(...Object.values(await (await import('./social.mjs')).buildSocial(tokens)));
} finally {
  await closeBrowser();
}
for (const f of built) console.log(path.relative(root, f));
