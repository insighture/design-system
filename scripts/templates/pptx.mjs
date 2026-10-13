/**
 * Insighture PowerPoint template (.potx) and sample deck (.pptx).
 *
 * A structured deck: the brand theme (colours + DM Sans), one layout per slide
 * frame, named placeholders, and sections — so a deck built on it restyles in
 * one place and edits cleanly in PowerPoint, Keynote and Google Slides.
 */
import pptxgen from 'pptxgenjs';
import fs from 'node:fs/promises';
import path from 'node:path';
import { LOGO_RATIO } from './assets.mjs';
import { applyTheme, fixPptxRuns, hex, outDir, toTemplate } from './lib.mjs';

const W = 13.333;
const H = 7.5;
const M = 0.6; // outer margin

export async function buildPptx(tokens, assets) {
  const { brand, palette, officeTheme } = tokens;
  const pres = new pptxgen();
  pres.layout = 'LAYOUT_WIDE';
  pres.author = 'Insighture';
  pres.company = 'Insighture';
  pres.title = 'Insighture presentation template';
  pres.theme = { headFontFace: officeTheme.majorFont, bodyFontFace: officeTheme.minorFont };
  const C = pres.SchemeColor;

  // Colours not in the 12-slot scheme (tints, on-dark text) stay hex.
  const onDark2 = hex(palette.deep[200]); // secondary text on dark teal
  const muted = hex(palette.neutral[500]);
  const body = hex(palette.neutral[700]);
  const SERIF = officeTheme.emphasisFont;

  // ---- Shared layout pieces --------------------------------------------------
  // The real logo: black on white, white (rose dot) on dark teal, all-white on rose.
  const logo = (path, x, y, h) => ({ image: { x, y, h, w: h * LOGO_RATIO, path, altText: 'Insighture' } });
  const footer = (dark) => [logo(dark ? assets.logoWhite : assets.logoBlack, M, H - 0.58, 0.24)];
  const slideNumber = (dark) => ({ x: W - M - 0.6, y: H - 0.55, w: 0.6, h: 0.3, fontSize: 10, color: dark ? onDark2 : muted, align: 'right', margin: 0 });
  const eyebrow = (color) => ({
    placeholder: {
      options: { name: 'eyebrow', type: 'body', align: 'left', x: M, y: 0.5, w: 8, h: 0.35, fontSize: 12, bold: true, color, charSpacing: 3, margin: 0, valign: 'bottom' },
      text: 'EYEBROW',
    },
  });
  const title = (opts = {}) => ({
    placeholder: {
      options: { name: 'title', type: 'title', align: 'left', x: M, y: 0.9, w: W - 2 * M, h: 0.95, fontSize: 36, bold: true, color: C.text1, margin: 0, valign: 'top', ...opts },
      text: 'Slide title',
    },
  });

  // ---- Layouts ----------------------------------------------------------------
  pres.defineSlideMaster({
    title: 'Title',
    background: { path: assets.roseSlide },
    objects: [
      logo(assets.logoWhiteMono, M, 0.55, 0.42),
      { placeholder: { options: { name: 'title', type: 'title', align: 'left', x: M, y: 1.7, w: 9.2, h: 2.9, fontSize: 54, bold: true, color: C.background1, valign: 'bottom', margin: 0, lineSpacingMultiple: 0.95 }, text: 'Presentation title' } },
      { placeholder: { options: { name: 'subtitle', type: 'body', align: 'left', x: M, y: 4.85, w: 8, h: 1.0, fontSize: 20, color: C.background1, valign: 'top', margin: 0 }, text: 'Subtitle' } },
      { placeholder: { options: { name: 'meta', type: 'body', align: 'left', x: M, y: H - 1.0, w: 7, h: 0.4, fontSize: 12, bold: true, color: C.background1, charSpacing: 2, margin: 0 }, text: 'DATE · PRESENTER' } },
    ],
  });

  pres.defineSlideMaster({
    title: 'Section',
    background: { path: assets.deepSlide },
    slideNumber: slideNumber(true),
    objects: [
      ...footer(true),
      { placeholder: { options: { name: 'number', type: 'body', align: 'left', x: M, y: 2.35, w: 6, h: 0.45, fontSize: 14, bold: true, color: C.accent2, charSpacing: 3, margin: 0 }, text: '01' } },
      { placeholder: { options: { name: 'title', type: 'title', align: 'left', x: M, y: 2.85, w: 9.5, h: 1.6, fontSize: 44, bold: true, color: C.background1, valign: 'top', margin: 0 }, text: 'Section title' } },
      { placeholder: { options: { name: 'subtitle', type: 'body', align: 'left', x: M, y: 4.55, w: 8.5, h: 1.0, fontSize: 18, color: onDark2, valign: 'top', margin: 0 }, text: 'What this section covers' } },
    ],
  });

  pres.defineSlideMaster({
    title: 'Title and Content',
    background: { color: C.background1 },
    slideNumber: slideNumber(false),
    objects: [
      ...footer(false), eyebrow(C.accent5), title(),
      { placeholder: { options: { name: 'body', type: 'body', align: 'left', x: M, y: 2.15, w: W - 2 * M, h: 4.5, fontSize: 18, color: body, valign: 'top', margin: 0, paraSpaceAfter: 10 }, text: 'Body text' } },
    ],
  });

  pres.defineSlideMaster({
    title: 'Two Content',
    background: { color: C.background1 },
    slideNumber: slideNumber(false),
    objects: [
      ...footer(false), eyebrow(C.accent5), title(),
      { placeholder: { options: { name: 'left', type: 'body', align: 'left', x: M + 0.4, y: 2.5, w: 5.05, h: 3.9, fontSize: 18, color: body, valign: 'top', margin: 0, paraSpaceAfter: 10 }, text: 'Left column' } },
      { placeholder: { options: { name: 'right', type: 'body', align: 'left', x: W / 2 + 0.65, y: 2.5, w: 5.05, h: 3.9, fontSize: 18, color: body, valign: 'top', margin: 0, paraSpaceAfter: 10 }, text: 'Right column' } },
    ],
  });

  pres.defineSlideMaster({
    title: 'Title Only',
    background: { color: C.background1 },
    slideNumber: slideNumber(false),
    objects: [...footer(false), eyebrow(C.accent5), title()],
  });

  pres.defineSlideMaster({
    title: 'Big Number',
    background: { color: C.background1 },
    slideNumber: slideNumber(false),
    objects: [
      ...footer(false), eyebrow(C.accent5),
      { placeholder: { options: { name: 'figure', type: 'body', align: 'left', x: M, y: 1.3, w: 7.2, h: 2.6, fontSize: 132, bold: true, color: C.accent1, valign: 'bottom', margin: 0 }, text: '00%' } },
      { placeholder: { options: { name: 'label', type: 'body', align: 'left', x: M, y: 4.05, w: 6.6, h: 1.1, fontSize: 26, bold: true, color: C.text1, valign: 'top', margin: 0 }, text: 'What the number means' } },
      { placeholder: { options: { name: 'support', type: 'body', align: 'left', x: M, y: 5.2, w: 6.6, h: 1.3, fontSize: 16, color: body, valign: 'top', margin: 0 }, text: 'Supporting detail or source' } },
    ],
  });

  pres.defineSlideMaster({
    title: 'Quote',
    background: { path: assets.deepSlide },
    slideNumber: slideNumber(true),
    objects: [
      ...footer(true),
      { text: { text: '“', options: { x: M - 0.05, y: 0.55, w: 2, h: 1.9, fontFace: SERIF, fontSize: 160, color: C.accent1, margin: 0, valign: 'top' } } },
      { placeholder: { options: { name: 'quote', type: 'body', align: 'left', x: M, y: 2.2, w: 10.6, h: 2.9, fontSize: 30, italic: true, color: C.background1, valign: 'top', margin: 0, lineSpacingMultiple: 1.1 }, text: 'Quote' } },
      { placeholder: { options: { name: 'name', type: 'body', align: 'left', x: M, y: 5.35, w: 8, h: 0.4, fontSize: 16, bold: true, color: C.background1, margin: 0 }, text: 'Name' } },
      { placeholder: { options: { name: 'role', type: 'body', align: 'left', x: M, y: 5.75, w: 8, h: 0.4, fontSize: 14, color: onDark2, margin: 0 }, text: 'Role, Company' } },
    ],
  });

  pres.defineSlideMaster({
    title: 'Closing',
    background: { path: assets.roseSlide },
    objects: [
      logo(assets.logoWhiteMono, M, 0.55, 0.42),
      { placeholder: { options: { name: 'title', type: 'title', align: 'left', x: M, y: 2.2, w: 9, h: 1.8, fontSize: 60, bold: true, color: C.background1, valign: 'bottom', margin: 0 }, text: 'Closing line' } },
      { placeholder: { options: { name: 'body', type: 'body', align: 'left', x: M, y: 4.25, w: 8, h: 1.4, fontSize: 18, color: C.background1, valign: 'top', margin: 0, paraSpaceAfter: 6 }, text: 'Contact details' } },
    ],
  });

  // ---- Sample slides ----------------------------------------------------------
  const em = (text) => ({ text, options: { fontFace: SERIF, italic: true, bold: false, color: C.accent1 } });
  const emWhite = (text) => ({ text, options: { fontFace: SERIF, italic: true, bold: false } });
  const card = (s, x, y, w, h, name) => s.addShape(pres.ShapeType.roundRect, {
    x, y, w, h, rectRadius: 0.18, objectName: name,
    fill: { color: C.background1 }, line: { color: hex(palette.neutral[200]), width: 1 },
    shadow: { type: 'outer', color: hex(brand.black), opacity: 0.07, blur: 10, offset: 2, angle: 90 },
  });

  // 1 · Title
  pres.addSection({ title: 'Opening' });
  let s = pres.addSlide({ masterName: 'Title', sectionTitle: 'Opening' });
  s.addText([{ text: 'We own the problem, not just ' }, emWhite('the solution')], { placeholder: 'title' });
  s.addText('Presentation template · Insighture design system', { placeholder: 'subtitle' });
  s.addText('OCTOBER 2026 · PRESENTER NAME', { placeholder: 'meta' });
  s.addNotes('Title layout. Keep the title to two or three lines. Set one or two words in DM Serif Display italic for emphasis (select the words, change the font, turn bold off and italic on).');

  // 2 · Agenda
  s = pres.addSlide({ masterName: 'Title Only', sectionTitle: 'Opening' });
  s.addText('AGENDA', { placeholder: 'eyebrow' });
  s.addText("What we'll cover", { placeholder: 'title' });
  const steps = [
    ['01', 'Context', 'Where things stand and why it matters now.'],
    ['02', 'Findings', 'What we learned, with the evidence behind it.'],
    ['03', 'Options', 'Three paths forward and their trade-offs.'],
    ['04', 'Next steps', 'The decision we need and what happens after.'],
  ];
  const cw = (W - 2 * M - 3 * 0.3) / 4;
  steps.forEach(([n, t, d], i) => {
    const x = M + i * (cw + 0.3);
    card(s, x, 2.45, cw, 3.1, `agenda-card-${n}`);
    s.addShape(pres.ShapeType.ellipse, { x: x + 0.35, y: 2.8, w: 0.75, h: 0.75, fill: { color: C.background1 }, line: { color: C.accent5, width: 1.5 }, objectName: `agenda-step-${n}` });
    s.addText(n, { x: x + 0.35, y: 2.8, w: 0.75, h: 0.75, align: 'center', valign: 'middle', fontSize: 15, bold: true, color: C.accent5, margin: 0, isTextBox: true });
    s.addText(t, { x: x + 0.35, y: 3.85, w: cw - 0.7, h: 0.5, fontSize: 20, bold: true, color: C.text1, margin: 0, isTextBox: true });
    s.addText(d, { x: x + 0.35, y: 4.4, w: cw - 0.7, h: 1.0, fontSize: 15, color: body, valign: 'top', margin: 0, isTextBox: true });
  });
  s.addNotes('Title Only layout with four step cards. Indigo outlines echo the maturity-model steps on insighture.com.');

  // 3 · Section
  pres.addSection({ title: 'Body' });
  s = pres.addSlide({ masterName: 'Section', sectionTitle: 'Body' });
  s.addText('01', { placeholder: 'number' });
  s.addText([{ text: 'Where we are ' }, em('today')], { placeholder: 'title' });
  s.addText('The current state, in numbers and in the words of the people doing the work.', { placeholder: 'subtitle' });
  s.addNotes('Section layout. Use one per major part of the deck. The number is optional.');

  // 4 · Service cards
  s = pres.addSlide({ masterName: 'Title Only', sectionTitle: 'Body' });
  s.addText('WHAT WE DO', { placeholder: 'eyebrow' });
  s.addText([{ text: 'Great outcomes start with the ' }, em('right thinking')], { placeholder: 'title' });
  const services = [
    ['AI', 'Artificial intelligence', 'Practical AI that delivers measurable business value.', C.accent1, palette.rose[700]],
    ['DA', 'Data & analytics', 'Turn fragmented data into insights that drive better decisions.', C.accent3, palette.orange[700]],
    ['CL', 'Cloud & platforms', 'Secure, scalable foundations built for growth.', C.accent4, palette.yellow[700]],
    ['IN', 'Integration', 'Connect systems and processes to simplify operations.', C.accent2, palette.teal[700]],
  ];
  services.forEach(([code, t, d, tile, link], i) => {
    const x = M + i * (cw + 0.3);
    card(s, x, 2.35, cw, 4.0, `service-card-${code}`);
    s.addShape(pres.ShapeType.roundRect, { x: x + 0.35, y: 2.7, w: 0.75, h: 0.75, rectRadius: 0.12, fill: { color: tile, transparency: 82 }, line: { type: 'none' }, objectName: `service-icon-${code}` });
    s.addText(code, { x: x + 0.35, y: 2.7, w: 0.75, h: 0.75, align: 'center', valign: 'middle', fontSize: 15, bold: true, color: hex(link), margin: 0, isTextBox: true });
    s.addText(t, { x: x + 0.35, y: 3.75, w: cw - 0.7, h: 0.8, fontSize: 19, bold: true, color: C.text1, valign: 'top', margin: 0, isTextBox: true });
    s.addText(d, { x: x + 0.35, y: 4.55, w: cw - 0.7, h: 1.1, fontSize: 14, color: body, valign: 'top', margin: 0, isTextBox: true });
    s.addText('Learn more  ›', { x: x + 0.35, y: 5.75, w: cw - 0.7, h: 0.35, fontSize: 14, color: hex(link), margin: 0, isTextBox: true });
  });
  s.addNotes('Card grid. Each card may take its own alt colour for its icon tile and link; text uses the darker 700 step for contrast.');

  // 5 · Big number
  s = pres.addSlide({ masterName: 'Big Number', sectionTitle: 'Body' });
  s.addText('THE HEADLINE', { placeholder: 'eyebrow' });
  s.addText('47%', { placeholder: 'figure' });
  s.addText('faster releases after platform modernisation', { placeholder: 'label' });
  s.addText('Median lead time for changes, measured over the two quarters before and after migration.', { placeholder: 'support' });
  const panelX = 8.35;
  s.addShape(pres.ShapeType.roundRect, { x: panelX, y: 1.3, w: W - M - panelX, h: 5.2, rectRadius: 0.25, fill: { color: C.text2 }, line: { type: 'none' }, objectName: 'stat-panel' });
  [['3.2×', 'deployment frequency'], ['−38%', 'change failure rate'], ['12 wks', 'to first production release']].forEach(([n, l], i) => {
    const y = 1.75 + i * 1.6;
    s.addText(n, { x: panelX + 0.45, y, w: 3.6, h: 0.75, fontSize: 36, bold: true, color: C.background1, margin: 0, isTextBox: true });
    s.addText(l, { x: panelX + 0.45, y: y + 0.75, w: 3.6, h: 0.45, fontSize: 15, color: onDark2, margin: 0, isTextBox: true });
  });
  s.addNotes('Big Number layout: one rose figure, a black label, and supporting detail. The dark teal panel holds secondary stats.');

  // 6 · Chart
  s = pres.addSlide({ masterName: 'Title Only', sectionTitle: 'Body' });
  s.addText('RESULTS', { placeholder: 'eyebrow' });
  s.addText([{ text: 'Lead time fell every quarter after ' }, em('migration')], { placeholder: 'title' });
  const grey = hex(palette.neutral[300]);
  s.addChart(pres.ChartType.bar, [{ name: 'Lead time (days)', labels: ['Q1', 'Q2', 'Q3', 'Q4', 'Q1', 'Q2'], values: [14.2, 13.8, 11.1, 9.4, 8.2, 7.5] }], {
    x: M, y: 2.2, w: 7.9, h: 4.4, barDir: 'col', barGapWidthPct: 60,
    chartColors: [grey, grey, grey, grey, grey, hex(brand.rose)],
    showValue: true, dataLabelPosition: 'outEnd', dataLabelFormatCode: '0.0', dataLabelColor: hex(palette.neutral[700]), dataLabelFontSize: 12, dataLabelFontFace: '+mn-lt',
    catAxisLabelColor: muted, catAxisLabelFontSize: 12, catAxisLabelFontFace: '+mn-lt', catAxisLineShow: false,
    valAxisHidden: true, valGridLine: { color: hex(palette.neutral[200]), size: 0.75 }, catGridLine: { style: 'none' },
    showLegend: false, showTitle: true, title: 'Median lead time for changes (days)', titleFontSize: 14, titleColor: hex(brand.black), titleFontFace: '+mn-lt',
    objectName: 'lead-time-chart',
  });
  s.addText([
    { text: 'Down 47% in six quarters', options: { bold: true, color: C.text1, fontSize: 20, breakLine: true } },
    { text: 'Most of the gain came after the deployment pipeline moved to the new platform in Q3.', options: { fontSize: 16, color: body } },
  ], { x: 9.0, y: 2.6, w: W - M - 9.0, h: 2.6, valign: 'top', margin: 0, paraSpaceAfter: 8, isTextBox: true });
  s.addNotes('Native chart. Highlight the one bar that matters in rose and keep the rest neutral grey.');

  // 7 · Two columns
  s = pres.addSlide({ masterName: 'Two Content', sectionTitle: 'Body' });
  // Rounded panels go on first so the column text sits on top of them.
  [M, W / 2 + 0.25].forEach((x, i) => s.addShape(pres.ShapeType.roundRect, {
    x, y: 2.1, w: 5.85, h: 4.55, rectRadius: 0.2, fill: { color: C.background2 }, line: { type: 'none' }, objectName: `option-panel-${i + 1}`,
  }));
  s.addText('OPTIONS', { placeholder: 'eyebrow' });
  s.addText('Two ways forward', { placeholder: 'title' });
  const col = (head, items) => [
    { text: head, options: { bold: true, color: C.text1, fontSize: 20, breakLine: true } },
    ...items.map((t, i) => ({ text: t, options: { bullet: true, breakLine: i < items.length - 1 } })),
  ];
  s.addText(col('Modernise in place', ['Lower upfront cost', 'Keeps current vendor contracts', 'Slower path to automation']), { placeholder: 'left' });
  s.addText(col('Re-platform', ['Faster releases within two quarters', 'One-off migration effort', 'Opens the door to AI workflows']), { placeholder: 'right' });
  s.addNotes('Two Content layout for comparisons. Lead each column with a bold line, then bullets.');

  // 8 · Quote
  pres.addSection({ title: 'Close' });
  s = pres.addSlide({ masterName: 'Quote', sectionTitle: 'Close' });
  s.addText('They identified the key skills required for success and let us be part of the selection process.', { placeholder: 'quote' });
  s.addText('Client name', { placeholder: 'name' });
  s.addText('Role, Company', { placeholder: 'role' });
  s.addNotes('Quote layout for testimonials. Keep quotes under about 30 words.');

  // 9 · Closing
  s = pres.addSlide({ masterName: 'Closing', sectionTitle: 'Close' });
  s.addText([{ text: "Let's " }, emWhite('talk')], { placeholder: 'title' });
  s.addText([
    { text: 'Your name', options: { bold: true, breakLine: true } },
    { text: 'name@insighture.com', options: { breakLine: true } },
    { text: 'insighture.com' },
  ], { placeholder: 'body' });
  s.addNotes('Closing layout. One clear next step, plus contact details.');

  const deck = path.join(outDir, 'powerpoint', 'Insighture-sample.pptx');
  const potx = path.join(outDir, 'powerpoint', 'Insighture.potx');
  await fs.mkdir(path.dirname(deck), { recursive: true });
  await pres.writeFile({ fileName: deck });
  await fixPptxRuns(deck, SERIF);
  await applyTheme(deck, officeTheme);
  await toTemplate(deck, potx);
  return { deck, potx };
}
