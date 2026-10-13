/**
 * Background art shared by the Office templates: the rose gradient and the
 * dark-teal ground, with the soft circle motif from insighture.com. Office
 * can't draw CSS gradients, so these are baked to PNG.
 */
import path from 'node:path';
import { assetDir, page, png } from './lib.mjs';

const circles = (stroke, glow) => `
  <div class="glow" style="background:radial-gradient(circle, ${glow} 0%, transparent 62%)"></div>
  <div class="ring r1" style="border-color:${stroke}"></div>
  <div class="ring r2" style="border-color:${stroke}"></div>`;

const css = `
  .bg{position:relative;width:100vw;height:100vh;overflow:hidden}
  .glow{position:absolute;width:78vmax;height:78vmax;right:-22vmax;top:8vmax;border-radius:50%}
  .ring{position:absolute;border:2px solid;border-radius:50%}
  .r1{width:30vmax;height:30vmax;right:-9vmax;bottom:-14vmax}
  .r2{width:8vmax;height:8vmax;right:24vmax;bottom:7vmax}
  .quiet .glow{opacity:.7}`;

const rose = (tokens) =>
  page(`<div class="bg" style="background:${tokens.roseGradient}">${circles('rgba(255,255,255,.28)', 'rgba(255,255,255,.16)')}</div>`, css);

const deep = (tokens) =>
  page(`<div class="bg quiet" style="background:${tokens.brand.deepTeal}">${circles('rgba(15,162,191,.22)', 'rgba(15,162,191,.12)')}</div>`, css);

export const ASSETS = {
  roseSlide: path.join(assetDir, 'rose-16x9.png'),
  deepSlide: path.join(assetDir, 'deep-teal-16x9.png'),
  roseA4: path.join(assetDir, 'rose-a4.png'),
  deepA4: path.join(assetDir, 'deep-teal-a4.png'),
};

export async function buildAssets(tokens) {
  await png(rose(tokens), 1600, 900, ASSETS.roseSlide, 1.2);
  await png(deep(tokens), 1600, 900, ASSETS.deepSlide, 1.2);
  // A4 at 96 css-dpi = 794 × 1123; ×2 gives ~190 dpi print quality.
  await png(rose(tokens), 794, 1123, ASSETS.roseA4, 2);
  await png(deep(tokens), 794, 1123, ASSETS.deepA4, 2);
  return ASSETS;
}
