/**
 * PDF templates: a multi-page report and a one-pager, both A4.
 *
 * The HTML sources are written to templates/pdf/src/ and link the real token
 * CSS and self-hosted fonts from src/styles/, so they are editable templates in
 * their own right: change the copy, re-run `npm run templates -- pdf`.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { outDir, pdf } from './lib.mjs';

const SRC = path.join(outDir, 'pdf', 'src');
const styles = '../../../src/styles';

const head = (title, css) => `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><title>${title}</title>
<link rel="stylesheet" href="${styles}/fonts.css">
<link rel="stylesheet" href="${styles}/tokens.css">
<style>
@page { size: A4; margin: 0 }
* { box-sizing: border-box }
html, body { margin: 0; padding: 0 }
body { font-family: var(--ins-font-sans); color: var(--ins-brand-black); font-size: 10.5pt; line-height: 1.5;
  -webkit-print-color-adjust: exact; print-color-adjust: exact }
.page { width: 210mm; height: 297mm; position: relative; overflow: hidden; page-break-after: always; break-after: page }
.page:last-child { page-break-after: auto; break-after: auto }
.pad { padding: 22mm 20mm 20mm }
h1, h2, h3 { margin: 0; font-weight: 600; letter-spacing: -0.02em; line-height: 1.1 }
h1 em, h2 em, .display em { font-family: var(--ins-font-serif); font-style: italic; font-weight: 400; letter-spacing: 0; color: var(--ins-brand-rose) }
p { margin: 0 0 3mm }
.eyebrow { font-size: 8.5pt; font-weight: 600; letter-spacing: .12em; text-transform: uppercase; color: var(--ins-indigo-500); margin-bottom: 2.5mm }
.lead { font-size: 12.5pt; color: var(--ins-neutral-700); line-height: 1.5 }
.muted { color: var(--ins-neutral-500) }
.logo { display: block; height: 9mm; width: auto }
.running .logo { display: inline; height: 3.4mm; vertical-align: middle }
/* Brand grounds, with the soft circle motif from insighture.com */
.rose { background: var(--ins-gradient-rose); color: var(--ins-brand-white) }
.deep { background: var(--ins-brand-deep-teal); color: var(--ins-brand-white) }
.rose em, .deep .white-em em { color: inherit !important }
.motif { position: absolute; border-radius: 50%; pointer-events: none }
.glow { width: 170mm; height: 170mm; right: -60mm; top: 20mm; background: radial-gradient(circle, rgba(255,255,255,.16) 0%, transparent 62%) }
.ring { border: 1.5px solid rgba(255,255,255,.28) }
.deep .glow { background: radial-gradient(circle, rgba(15,162,191,.14) 0%, transparent 62%) }
.deep .ring { border-color: rgba(15,162,191,.25) }
.pill { display: inline-block; padding: 3mm 7mm; border-radius: 999px; font-weight: 600; font-size: 10pt }
.pill.white { background: var(--ins-brand-white); color: var(--ins-rose-600) }
.running { position: absolute; left: 20mm; right: 20mm; display: flex; justify-content: space-between; font-size: 8pt; color: var(--ins-neutral-500) }
.running.top { top: 10mm; padding-bottom: 2.5mm; border-bottom: 1px solid var(--ins-neutral-200) }
.running.top b { color: var(--ins-brand-black); font-weight: 600 }
.running.bottom { bottom: 10mm }
${css}
</style></head><body>`;

const report = (tokens) => head('Insighture report', `
.cover h1 { font-size: 40pt; line-height: 1.02; letter-spacing: -0.025em; max-width: 150mm }
.cover .eyebrow { color: rgba(255,255,255,.9) }
.cover .sub { font-size: 14pt; max-width: 130mm; margin-top: 6mm; opacity: .92 }
.cover .meta { position: absolute; left: 20mm; bottom: 22mm; font-size: 8.5pt; font-weight: 600; letter-spacing: .12em; text-transform: uppercase }
h1.section { font-size: 24pt; margin-bottom: 4mm }
h2 { font-size: 14pt; margin: 8mm 0 2.5mm }
.stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 4mm; margin: 6mm 0 2mm }
.stat { background: var(--ins-neutral-100); border-radius: 4mm; padding: 5mm }
.stat b { display: block; font-size: 24pt; font-weight: 600; letter-spacing: -0.02em; color: var(--ins-brand-rose); line-height: 1.1 }
.stat span { font-size: 9pt; color: var(--ins-neutral-700) }
ul, ol { margin: 0 0 3mm; padding-left: 5mm }
li { margin-bottom: 1.5mm }
ul li::marker { color: var(--ins-brand-rose) }
ol li::marker { color: var(--ins-brand-rose); font-weight: 600 }
.chart { margin: 4mm 0 1mm; border: 1px solid var(--ins-neutral-200); border-radius: 4.5mm; padding: 5mm 6mm 3mm }
.chart h3 { font-size: 10pt; margin-bottom: 3mm }
.caption { font-size: 8pt; color: var(--ins-neutral-500) }
table { width: 100%; border-collapse: collapse; font-size: 9pt; margin: 3mm 0 1mm }
th { background: var(--ins-neutral-100); text-align: left; font-size: 7.5pt; letter-spacing: .08em; text-transform: uppercase; color: var(--ins-neutral-600); font-weight: 600; padding: 2.5mm 3mm; border-bottom: 1px solid var(--ins-neutral-300) }
td { padding: 2.5mm 3mm; border-bottom: 1px solid var(--ins-neutral-200) }
th:not(:first-child), td:not(:first-child) { text-align: right; font-variant-numeric: tabular-nums }
.takeaway { border-radius: 4.5mm; padding: 6mm 7mm; margin: 6mm 0 }
.takeaway .eyebrow { color: var(--ins-teal-400); margin-bottom: 2mm }
.takeaway p { font-size: 12.5pt; margin: 0 }
blockquote { margin: 6mm 0; padding: 0 8mm; font-size: 13pt; font-style: italic; line-height: 1.45 }
blockquote cite { display: block; margin-top: 2mm; font-size: 9pt; font-style: normal; color: var(--ins-neutral-500) }
.back h2 { font-size: 34pt; letter-spacing: -0.025em; margin: 0 0 5mm }
.back h2 em { color: var(--ins-brand-rose) }
.back p { color: var(--ins-deep-200); font-size: 12pt }
`) + `
<section class="page cover rose pad">
  <div class="motif glow"></div><div class="motif ring" style="width:95mm;height:95mm;right:-30mm;bottom:-45mm"></div>
  <div class="motif ring" style="width:24mm;height:24mm;right:70mm;bottom:28mm"></div>
  <img class="logo" src="../../../brand/logo/insighture-logo-white-mono.svg" alt="Insighture">
  <div style="margin-top:88mm">
    <div class="eyebrow">Platform review</div>
    <h1>Modernising for <em>speed</em> and control</h1>
    <p class="sub">How the delivery platform performed in the year after migration, and what to do next.</p>
  </div>
  <div class="meta">October 2026 · Insighture</div>
</section>

<section class="page pad">
  <div class="running top"><img class="logo" src="../../../brand/logo/insighture-logo-black.svg" alt="Insighture"><span>Platform review · October 2026</span></div>
  <div class="eyebrow">Executive summary</div>
  <h1 class="section">Faster releases, <em>fewer</em> failures</h1>
  <p class="lead">In the twelve months since the move to the new platform, the team ships nearly twice as often and fixes problems faster. The gains are real but uneven, and two areas need attention before the next phase.</p>
  <div class="stats">
    <div class="stat"><b>47%</b><span>shorter lead time for changes</span></div>
    <div class="stat"><b>3.2×</b><span>more frequent deployments</span></div>
    <div class="stat"><b>−38%</b><span>change failure rate</span></div>
  </div>
  <h2>What changed</h2>
  <p>Deployment moved from a weekly, manually approved release train to on-demand releases through an automated pipeline. Environments are now created from code, and every change runs the same checks.</p>
  <ul><li>Lead time for changes fell from 14.2 to 7.5 days.</li><li>Deployments rose from 4 to 13 a month.</li><li>Rollbacks now take minutes instead of hours.</li></ul>
  <div class="chart">
    <h3>Median lead time for changes (days)</h3>
    ${barChart(tokens, ['Q1 25', 'Q2 25', 'Q3 25', 'Q4 25', 'Q1 26', 'Q2 26'], [14.2, 13.8, 11.1, 9.4, 8.2, 7.5])}
  </div>
  <p class="caption">Source: delivery pipeline telemetry, median per quarter.</p>
  <div class="running bottom"><span>insighture.com</span><span>2</span></div>
</section>

<section class="page pad">
  <div class="running top"><img class="logo" src="../../../brand/logo/insighture-logo-black.svg" alt="Insighture"><span>Platform review · October 2026</span></div>
  <h2 style="margin-top:4mm">Results by quarter</h2>
  <table>
    <thead><tr><th>Quarter</th><th>Lead time (days)</th><th>Deploys / month</th><th>Failure rate</th></tr></thead>
    <tbody>
      <tr><td>Q1 2025</td><td>14.2</td><td>4</td><td>21%</td></tr><tr><td>Q2 2025</td><td>13.8</td><td>5</td><td>19%</td></tr>
      <tr><td>Q3 2025</td><td>11.1</td><td>8</td><td>16%</td></tr><tr><td>Q4 2025</td><td>9.4</td><td>10</td><td>14%</td></tr>
      <tr><td>Q1 2026</td><td>8.2</td><td>12</td><td>13%</td></tr><tr><td>Q2 2026</td><td>7.5</td><td>13</td><td>13%</td></tr>
    </tbody>
  </table>
  <div class="takeaway deep"><div class="eyebrow">Key takeaway</div><p>The platform has paid for itself in delivery speed. The remaining risk is in testing, not tooling.</p></div>
  <h2>Where it fell short</h2>
  <p>Automated test coverage grew more slowly than release frequency, so a larger share of defects now reach production before they are caught. Two legacy services were never moved and still need the old release process.</p>
  <blockquote>“The pipeline changed how we work. We stopped batching changes because we were afraid of them.”<cite>Engineering lead, platform team</cite></blockquote>
  <h2>Recommendations</h2>
  <ol>
    <li>Raise automated test coverage on the five highest-change services to 80% by Q1.</li>
    <li>Retire or migrate the two remaining legacy services.</li>
    <li>Pilot AI-assisted code review on one team and measure the defect escape rate.</li>
  </ol>
  <div class="running bottom"><span>insighture.com</span><span>3</span></div>
</section>

<section class="page deep back pad">
  <div class="motif glow"></div><div class="motif ring" style="width:95mm;height:95mm;right:-30mm;bottom:-45mm"></div>
  <img class="logo" src="../../../brand/logo/insighture-logo-white.svg" alt="Insighture">
  <div style="margin-top:150mm">
    <h2>Let's <em>talk</em></h2>
    <p>Your name · name@insighture.com</p>
    <p>insighture.com</p>
  </div>
</section>
</body></html>`;

/** Inline SVG column chart: neutral bars, the last (the one that matters) in rose. */
function barChart(tokens, labels, values) {
  const { brand, palette } = tokens;
  const W = 160, Hh = 52, top = 6, base = 44, max = Math.max(...values) * 1.05;
  const bw = (W / labels.length) * 0.56, step = W / labels.length;
  const bars = values.map((v, i) => {
    const h = ((base - top) * v) / max, x = i * step + (step - bw) / 2, y = base - h;
    const fill = i === values.length - 1 ? brand.rose : palette.neutral[300];
    return `<rect x="${x.toFixed(2)}" y="${y.toFixed(2)}" width="${bw.toFixed(2)}" height="${h.toFixed(2)}" rx="1" fill="${fill}"/>
      <text x="${(x + bw / 2).toFixed(2)}" y="${(y - 1.5).toFixed(2)}" font-size="3.2" text-anchor="middle" fill="${palette.neutral[700]}">${v}</text>
      <text x="${(x + bw / 2).toFixed(2)}" y="${base + 5}" font-size="3" text-anchor="middle" fill="${palette.neutral[500]}">${labels[i]}</text>`;
  }).join('');
  return `<svg viewBox="0 0 ${W} ${Hh}" width="100%" style="display:block;font-family:inherit">
    <line x1="0" x2="${W}" y1="${base}" y2="${base}" stroke="${palette.neutral[200]}" stroke-width=".3"/>${bars}</svg>`;
}

const onePager = () => head('Insighture one-pager', `
.hero { height: 90mm; padding: 15mm 20mm 0; position: relative; overflow: hidden }
.hero .display { font-size: 32pt; font-weight: 600; letter-spacing: -0.025em; line-height: 1.04; margin: 11mm 0 4mm; max-width: 140mm }
.hero p { font-size: 12.5pt; max-width: 120mm; opacity: .94 }
.body { padding: 10mm 20mm 0 }
.body h2 { font-size: 18pt; margin-bottom: 6mm }
.cards { display: grid; grid-template-columns: 1fr 1fr; gap: 5mm }
.card { border: 1px solid var(--ins-neutral-200); border-radius: 4.75mm; padding: 5mm 6mm; box-shadow: 0 1px 3px rgba(21,24,26,.06) }
.tile { width: 10mm; height: 10mm; border-radius: 2.6mm; display: grid; place-items: center; font-weight: 700; font-size: 9pt; margin-bottom: 3mm }
.card h3 { font-size: 12pt; margin-bottom: 1.5mm }
.card p { font-size: 9.5pt; color: var(--ins-neutral-700); margin: 0 0 3mm }
.card .more { font-size: 9.5pt; font-weight: 500 }
.statrow { display: grid; grid-template-columns: repeat(3, 1fr); gap: 5mm; margin-top: 7mm }
.statrow b { display: block; font-size: 22pt; font-weight: 600; letter-spacing: -0.02em; color: var(--ins-brand-rose) }
.statrow span { font-size: 9pt; color: var(--ins-neutral-700) }
.cta { position: absolute; left: 0; right: 0; bottom: 0; height: 34mm; padding: 0 20mm; display: flex; align-items: center; justify-content: space-between; overflow: hidden }
.cta h3 { font-size: 16pt; margin: 0 0 1mm }
.cta p { margin: 0; color: var(--ins-deep-200); font-size: 9.5pt }
.pill.rose { background: var(--ins-brand-rose); color: var(--ins-brand-white) }
`) + `
<section class="page">
  <div class="hero rose">
    <div class="motif glow"></div><div class="motif ring" style="width:80mm;height:80mm;right:-25mm;bottom:-40mm"></div>
    <div class="motif ring" style="width:16mm;height:16mm;right:62mm;bottom:20mm"></div>
    <img class="logo" src="../../../brand/logo/insighture-logo-white-mono.svg" alt="Insighture">
    <div class="display">We own the problem, not just <em>the solution</em></div>
    <p>Technology consulting and AI partner. Because the best outcomes begin long before implementation.</p>
  </div>
  <div class="body">
    <div class="eyebrow">What we do</div>
    <h2 style="font-size:18pt;margin-bottom:5mm">Great outcomes start with the <em>right thinking</em></h2>
    <div class="cards">
      <div class="card"><div class="tile" style="background:var(--ins-rose-50);color:var(--ins-rose-700)">AI</div><h3>Artificial intelligence</h3><p>Practical AI that delivers measurable business value.</p><div class="more" style="color:var(--ins-rose-700)">Learn more ›</div></div>
      <div class="card"><div class="tile" style="background:var(--ins-orange-50);color:var(--ins-orange-700)">DA</div><h3>Data &amp; analytics</h3><p>Turn fragmented data into insights that drive better decisions.</p><div class="more" style="color:var(--ins-orange-700)">Learn more ›</div></div>
      <div class="card"><div class="tile" style="background:var(--ins-yellow-50);color:var(--ins-yellow-700)">CL</div><h3>Cloud &amp; platforms</h3><p>Secure, scalable foundations built for growth.</p><div class="more" style="color:var(--ins-yellow-700)">Learn more ›</div></div>
      <div class="card"><div class="tile" style="background:var(--ins-teal-50);color:var(--ins-teal-700)">IN</div><h3>Integration</h3><p>Connect systems and processes to simplify operations.</p><div class="more" style="color:var(--ins-teal-700)">Learn more ›</div></div>
    </div>
    <div class="statrow">
      <div><b>47%</b><span>shorter lead time for changes</span></div>
      <div><b>3.2×</b><span>more frequent deployments</span></div>
      <div><b>AWS</b><span>Advanced Tier Services Partner</span></div>
    </div>
  </div>
  <div class="cta deep">
    <div class="motif glow" style="top:-60mm"></div>
    <div><h3>Don't scale the wrong problem</h3><p>Consult with us so you can move forward with clarity.</p></div>
    <span class="pill rose">Let's talk</span>
  </div>
</section>
</body></html>`;

export async function buildPdf(tokens) {
  await fs.mkdir(SRC, { recursive: true });
  const files = {};
  for (const [name, html] of [['report', report(tokens)], ['one-pager', onePager(tokens)]]) {
    const src = path.join(SRC, `${name}.html`);
    await fs.writeFile(src, html);
    const out = path.join(outDir, 'pdf', `Insighture-${name}.pdf`);
    await pdf(src, out);
    files[name] = out;
  }
  return files;
}
