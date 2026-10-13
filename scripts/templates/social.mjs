/**
 * Social cards, rendered to PNG at 2×: a LinkedIn / link-preview card, a square
 * quote card and a portrait stat card. Edit the copy here and re-run
 * `npm run templates -- social`.
 */
import path from 'node:path';
import { loadLogos, outDir, page, png } from './lib.mjs';

const fit = (svg) => svg.replace(/width="\d+" height="\d+"/, 'width="100%" height="100%"');
const mark = (svg) => `<div style="width:170px;height:40px">${fit(svg)}</div>`;

const css = `
  .card{position:relative;width:100vw;height:100vh;overflow:hidden;box-sizing:border-box;display:flex;flex-direction:column}
  .rose{background:var(--ins-gradient-rose);color:var(--ins-brand-white)}
  .deep{background:var(--ins-brand-deep-teal);color:var(--ins-brand-white)}
  .light{background:var(--ins-brand-white);color:var(--ins-brand-black)}
  .wm{font-weight:300;letter-spacing:-0.01em}
  h1{margin:0;font-weight:600;letter-spacing:-0.025em;line-height:1.02}
  em{font-family:var(--ins-font-serif);font-style:italic;font-weight:400;letter-spacing:0}
  .rose em{color:inherit} .deep em,.light em{color:var(--ins-brand-rose)}
  .glow{position:absolute;border-radius:50%;width:90vmax;height:90vmax;right:-30vmax;top:5vmax;background:radial-gradient(circle,rgba(255,255,255,.16) 0%,transparent 62%)}
  .deep .glow{background:radial-gradient(circle,rgba(15,162,191,.14) 0%,transparent 62%)}
  .ring{position:absolute;border-radius:50%;border:2px solid rgba(255,255,255,.28)}
  .deep .ring{border-color:rgba(15,162,191,.25)}
  .eyebrow{font-weight:600;text-transform:uppercase;letter-spacing:.14em}
  .pill{display:inline-block;border-radius:999px;font-weight:600}`;

const linkedin = (L) => page(`<div class="card rose" style="padding:64px 72px">
  <div class="glow"></div><div class="ring" style="width:420px;height:420px;right:-120px;bottom:-200px"></div>
  <div class="ring" style="width:90px;height:90px;right:330px;bottom:70px"></div>
  ${mark(L.whiteMono)}
  <div style="margin-top:auto">
    <h1 style="font-size:68px;max-width:860px">Don't scale the wrong <em>problem</em></h1>
    <p style="font-size:26px;margin:22px 0 30px;max-width:720px;opacity:.94">How to find the real constraint before you invest in fixing it.</p>
    <span class="pill" style="background:#fff;color:var(--ins-rose-600);font-size:22px;padding:14px 30px">Read the article</span>
  </div></div>`, css);

const quote = (L) => page(`<div class="card deep" style="padding:84px">
  <div class="glow"></div><div class="ring" style="width:520px;height:520px;right:-180px;bottom:-240px"></div>
  <div style="margin:auto 0">
    <div style="font-family:var(--ins-font-serif);font-size:220px;line-height:.8;color:var(--ins-brand-rose);height:150px">“</div>
    <p style="font-size:54px;line-height:1.25;font-style:italic;margin:24px 0 0;max-width:900px">Implementing the platform without an in&#8209;house DevOps team was a leap of faith. Insighture made the transition seamless.</p>
  </div>
  <div style="display:flex;justify-content:space-between;align-items:flex-end">
    <div><div style="font-size:28px;font-weight:600">Client name</div><div style="font-size:24px;color:var(--ins-deep-200);margin-top:6px">Role, Company</div></div>
    ${mark(L.white)}
  </div></div>`, css);

const stat = (L) => page(`<div class="card light" style="padding:84px">
  ${mark(L.black)}
  <div style="margin:auto 0">
    <div class="eyebrow" style="font-size:22px;color:var(--ins-indigo-500)">Platform modernisation</div>
    <div style="font-size:300px;font-weight:600;letter-spacing:-0.04em;line-height:1;color:var(--ins-brand-rose);margin-top:28px">47%</div>
    <h1 style="font-size:64px;margin-top:20px;max-width:880px">shorter lead time, <em>one year</em> after migration</h1>
  </div>
  <div style="display:flex;justify-content:space-between;align-items:center">
    <span style="font-size:24px;color:var(--ins-neutral-600)">insighture.com</span>
    <span class="pill" style="background:var(--ins-brand-rose);color:#fff;font-size:22px;padding:14px 30px">Read the case study</span>
  </div></div>`, css);

export async function buildSocial() {
  const dir = path.join(outDir, 'social');
  const files = {
    linkedin: path.join(dir, 'linkedin-1200x627.png'),
    quote: path.join(dir, 'quote-1080x1080.png'),
    stat: path.join(dir, 'stat-1080x1350.png'),
  };
  const L = await loadLogos();
  await png(linkedin(L), 1200, 627, files.linkedin, 1);
  await png(quote(L), 1080, 1080, files.quote, 1);
  await png(stat(L), 1080, 1350, files.stat, 1);
  return files;
}
