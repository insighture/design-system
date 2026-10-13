/**
 * Insighture Word templates: report (.dotx + filled sample .docx) and
 * letterhead (.dotx). A4, DM Sans, brand styles registered as real Word
 * styles so documents built on them stay consistent and restyle in one place.
 */
import {
  AlignmentType, BorderStyle, Document, Footer, Header, HeadingLevel, HorizontalPositionRelativeFrom,
  ImageRun, LevelFormat, PageBreak, PageNumber, Packer, Paragraph, ShadingType, Table, TableCell,
  TableRow, TabStopType, TextRun, VerticalAlign, VerticalPositionRelativeFrom, WidthType,
} from 'docx';
import fs from 'node:fs/promises';
import path from 'node:path';
import { LOGO_RATIO } from './assets.mjs';
import { hex, outDir, toTemplate } from './lib.mjs';

// A4 in DXA (1/20 pt). Margins 22 mm.
const PAGE = { width: 11906, height: 16838 };
const MARGIN = 1247;
const CONTENT = PAGE.width - 2 * MARGIN;

export async function buildDocx(tokens, assets) {
  const { brand, palette, officeTheme, mediaType } = tokens;
  const t = mediaType.document;
  const pt = (n) => Math.round(n * 2); // docx sizes are half-points
  const SANS = officeTheme.minorFont;
  const SERIF = officeTheme.emphasisFont;
  const ink = hex(brand.black);
  const body = hex(palette.neutral[700]);
  const muted = hex(palette.neutral[500]);
  const rule = hex(palette.neutral[200]);
  const subtle = hex(palette.neutral[100]);
  const roseText = hex(palette.rose[700]);

  const styles = {
    default: {
      document: { run: { font: SANS, size: pt(t.body), color: ink }, paragraph: { spacing: { after: 120, line: 312 } } },
      title: { run: { font: SANS, size: pt(t.title), bold: true, color: ink }, paragraph: { spacing: { after: 160, line: 264 } } },
      heading1: { run: { font: SANS, size: pt(t.h1), bold: true, color: ink }, paragraph: { spacing: { before: 360, after: 140, line: 276 }, keepNext: true } },
      heading2: { run: { font: SANS, size: pt(t.h2), bold: true, color: ink }, paragraph: { spacing: { before: 280, after: 100, line: 288 }, keepNext: true } },
      heading3: { run: { font: SANS, size: pt(t.h3), bold: true, color: ink }, paragraph: { spacing: { before: 200, after: 80 }, keepNext: true } },
      // Word's built-in Heading 4–6 and Hyperlink styles default to Office blue; pin them to the brand.
      heading4: { run: { font: SANS, size: pt(t.body), bold: true, color: ink }, paragraph: { spacing: { before: 160, after: 60 }, keepNext: true } },
      heading5: { run: { font: SANS, size: pt(t.body), bold: true, color: body }, paragraph: { spacing: { before: 160, after: 60 }, keepNext: true } },
      heading6: { run: { font: SANS, size: pt(t.small), bold: true, allCaps: true, color: muted }, paragraph: { spacing: { before: 160, after: 60 }, keepNext: true } },
      hyperlink: { run: { color: ink, underline: { type: 'single', color: ink } } },
    },
    paragraphStyles: [
      { id: 'Eyebrow', name: 'Eyebrow', basedOn: 'Normal', next: 'Heading1', quickFormat: true,
        run: { size: pt(t.small), bold: true, allCaps: true, color: roseText, characterSpacing: 30 }, paragraph: { spacing: { before: 240, after: 40 }, keepNext: true } },
      { id: 'Lead', name: 'Lead', basedOn: 'Normal', next: 'Normal', quickFormat: true,
        run: { size: pt(13), color: body }, paragraph: { spacing: { after: 200, line: 324 } } },
      { id: 'Subtitle', name: 'Subtitle', basedOn: 'Normal', next: 'Normal', quickFormat: true,
        run: { size: pt(14), color: body } },
      { id: 'Quote', name: 'Quote', basedOn: 'Normal', next: 'Normal', quickFormat: true,
        run: { size: pt(14), italics: true, color: ink }, paragraph: { indent: { left: 567, right: 567 }, spacing: { before: 240, after: 240, line: 336 } } },
      { id: 'Caption', name: 'Caption', basedOn: 'Normal', next: 'Normal', quickFormat: true,
        run: { size: pt(t.caption), color: muted } },
      { id: 'TableText', name: 'Table Text', basedOn: 'Normal', quickFormat: true,
        run: { size: pt(t.small) }, paragraph: { spacing: { before: 60, after: 60, line: 264 } } },
      { id: 'TableHeader', name: 'Table Header', basedOn: 'TableText', quickFormat: true,
        run: { bold: true, allCaps: true, color: hex(palette.neutral[600]), characterSpacing: 10 } },
    ],
    characterStyles: [
      // The brand's signature: one or two headline words in serif italic rose.
      { id: 'SerifEmphasis', name: 'Serif Emphasis', basedOn: 'DefaultParagraphFont', quickFormat: true,
        run: { font: SERIF, italics: true, bold: false, color: hex(brand.rose) } },
      { id: 'Strong', name: 'Strong', basedOn: 'DefaultParagraphFont', quickFormat: true, run: { bold: true } },
    ],
  };

  const numbering = {
    config: [
      { reference: 'bullets', levels: [{ level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: 400, hanging: 260 } }, run: { color: hex(brand.rose) } } }] },
      { reference: 'steps', levels: [{ level: 0, format: LevelFormat.DECIMAL, text: '%1.', alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: 400, hanging: 340 } }, run: { bold: true, color: hex(brand.rose) } } }] },
    ],
  };

  // ---- Building blocks --------------------------------------------------------
  const P = (text, opts = {}) => new Paragraph({ ...opts, children: typeof text === 'string' ? [new TextRun(text)] : text });
  const em = (text) => new TextRun({ text, style: 'SerifEmphasis' });
  const bullet = (text) => new Paragraph({ numbering: { reference: 'bullets', level: 0 }, children: [new TextRun(text)] });
  const step = (text) => new Paragraph({ numbering: { reference: 'steps', level: 0 }, children: [new TextRun(text)] });
  const none = { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' };
  const noBorders = { top: none, bottom: none, left: none, right: none };
  const line = { style: BorderStyle.SINGLE, size: 4, color: rule };

  const cover = (bg, kicker, titleRuns, subtitle, meta) => [
    new Paragraph({ children: [new ImageRun({
      type: 'png', data: bg, transformation: { width: 794, height: 1123 },
      floating: { horizontalPosition: { relative: HorizontalPositionRelativeFrom.PAGE, offset: 0 },
        verticalPosition: { relative: VerticalPositionRelativeFrom.PAGE, offset: 0 }, behindDocument: true, allowOverlap: true },
      altText: { name: 'Cover background', title: 'Cover background', description: 'Insighture rose gradient' },
    })] }),
    P([logo(logos.whiteMono, 150)], { spacing: { after: 4800 } }),
    P([new TextRun({ text: kicker, color: 'FFFFFF' })], { style: 'Eyebrow' }),
    P(titleRuns.map((r) => (r instanceof TextRun ? r : new TextRun(r))), { style: 'Title' }),
    P([new TextRun({ text: subtitle, color: 'FFFFFF', size: pt(14) })], { spacing: { after: 2400 } }),
    P([new TextRun({ text: meta, color: 'FFFFFF', bold: true, allCaps: true, size: pt(t.small), characterSpacing: 20 })]),
  ];

  // Cover runs need white text including the serif word.
  const white = (text) => new TextRun({ text, color: 'FFFFFF', bold: true, size: pt(36) });
  const whiteEm = (text) => new TextRun({ text, color: 'FFFFFF', font: SERIF, italics: true, bold: false, size: pt(36) });

  const header = (rightText) => new Header({ children: [new Paragraph({
    tabStops: [{ type: TabStopType.RIGHT, position: CONTENT }],
    border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: rule, space: 6 } },
    children: [logo(logos.black, 70),
      new TextRun({ text: `\t${rightText}`, size: pt(t.caption), color: muted })],
  })] });
  const footer = (leftText) => new Footer({ children: [new Paragraph({
    tabStops: [{ type: TabStopType.RIGHT, position: CONTENT }],
    children: [new TextRun({ text: leftText, size: pt(t.caption), color: muted }),
      new TextRun({ children: ['\t', PageNumber.CURRENT], size: pt(t.caption), color: muted })],
  })] });

  const section = (children, opts = {}) => ({
    properties: { page: { size: PAGE, margin: { top: MARGIN + 200, bottom: MARGIN, left: MARGIN, right: MARGIN, header: 600, footer: 600 } }, ...opts.properties },
    headers: opts.headers, footers: opts.footers, children,
  });

  const cell = (children, width, extra = {}) => new TableCell({
    width: { size: width, type: WidthType.DXA }, children, borders: extra.borders ?? noBorders,
    shading: extra.fill ? { type: ShadingType.CLEAR, color: 'auto', fill: extra.fill } : undefined,
    margins: extra.margins ?? { top: 80, bottom: 80, left: 120, right: 120 }, verticalAlign: extra.valign ?? VerticalAlign.TOP,
  });

  const stats = (items) => {
    const gap = 200;
    const w = Math.floor((CONTENT - gap * (items.length - 1)) / items.length);
    const cols = items.flatMap((_, i) => (i ? [gap, w] : [w]));
    return new Table({
      width: { size: CONTENT, type: WidthType.DXA }, columnWidths: cols, borders: noBorders,
      rows: [new TableRow({ cantSplit: true, children: items.flatMap(([n, l], i) => [
        ...(i ? [cell([P('')], gap)] : []),
        cell([P([new TextRun({ text: n, bold: true, size: pt(26), color: hex(brand.rose) })], { spacing: { after: 40 } }),
          P([new TextRun({ text: l, size: pt(t.small), color: body })], { spacing: { after: 0 } })], w,
        { fill: subtle, margins: { top: 240, bottom: 240, left: 240, right: 240 } }),
      ]) })],
    });
  };

  const dataTable = (head, rows) => {
    const w = Math.floor(CONTENT / head.length);
    const widths = head.map((_, i) => (i === head.length - 1 ? CONTENT - w * (head.length - 1) : w));
    const row = (vals, isHead) => new TableRow({ cantSplit: true, tableHeader: isHead, children: vals.map((v, i) => cell(
      [P(v, { style: isHead ? 'TableHeader' : 'TableText', alignment: i && !isHead ? AlignmentType.RIGHT : i ? AlignmentType.RIGHT : AlignmentType.LEFT })], widths[i],
      { fill: isHead ? subtle : undefined, borders: { top: none, left: none, right: none, bottom: isHead ? { style: BorderStyle.SINGLE, size: 6, color: hex(palette.neutral[300]) } : line } },
    )) });
    return new Table({ width: { size: CONTENT, type: WidthType.DXA }, columnWidths: widths, rows: [row(head, true), ...rows.map((r) => row(r))] });
  };

  // One dark-teal "key takeaway" box per page at most.
  const takeaway = (label, text) => new Table({
    width: { size: CONTENT, type: WidthType.DXA }, columnWidths: [CONTENT], borders: noBorders,
    rows: [new TableRow({ cantSplit: true, children: [cell([
      P([new TextRun({ text: label, bold: true, allCaps: true, size: pt(t.small), color: hex(palette.teal[400]), characterSpacing: 30 })], { spacing: { after: 80 } }),
      P([new TextRun({ text, size: pt(13), color: 'FFFFFF' })], { spacing: { after: 0, line: 312 } }),
    ], CONTENT, { fill: hex(brand.deepTeal), margins: { top: 300, bottom: 300, left: 340, right: 340 } })] })],
  });

  const spacer = (after = 240) => P('', { spacing: { after } });
  const roseBg = await fs.readFile(assets.roseA4);
  const logos = { black: await fs.readFile(assets.logoBlack), whiteMono: await fs.readFile(assets.logoWhiteMono) };
  // Inline logo, sized by width in px (96 dpi).
  const logo = (data, width) => new ImageRun({ type: 'png', data, transformation: { width, height: Math.round(width / LOGO_RATIO) },
    altText: { name: 'Insighture', title: 'Insighture', description: 'Insighture logo' } });
  const make = (sections) => new Document({
    creator: 'Insighture', title: 'Insighture report', styles, numbering,
    features: { updateFields: false }, sections,
  });

  // ---- Report template (.dotx) ---------------------------------------------
  const guide = make([
    section(cover(roseBg, 'Report', [white('Report title with an '), whiteEm('emphasis'), white(' word')],
      'Subtitle: one sentence on what this report answers.', 'Month 2026 · Author name'), { properties: { titlePage: false } }),
    section([
      P('Eyebrow — section label', { style: 'Eyebrow' }),
      P([new TextRun('Heading 1 with a '), em('serif emphasis')], { heading: HeadingLevel.HEADING_1 }),
      P('Lead paragraph. Open each major section with one or two sentences in the Lead style that say what the section concludes.', { style: 'Lead' }),
      P('Body text is DM Sans 10.5 pt in black with 1.3 line spacing. Keep paragraphs short. Use the Serif Emphasis character style for one or two words in a heading, never in body text. Built-in styles: Title, Subtitle, Heading 1–3, Lead, Eyebrow, Quote, Caption, Table Header, Table Text.'),
      P('Heading 2', { heading: HeadingLevel.HEADING_2 }),
      bullet('Bulleted lists use the rose bullet from the “bullets” list.'),
      bullet('Keep each item to one line where possible.'),
      P('Heading 3', { heading: HeadingLevel.HEADING_3 }),
      step('Numbered steps use the “steps” list.'),
      step('Use them for sequences and next steps.'),
      spacer(120),
      stats([['00%', 'Stat label'], ['0.0×', 'Stat label'], ['00', 'Stat label']]),
      spacer(),
      dataTable(['Item', 'Value', 'Change'], [['Row label', '0.0', '+0%'], ['Row label', '0.0', '−0%']]),
      P('Caption: source or note for the table above.', { style: 'Caption', spacing: { before: 80 } }),
      spacer(120),
      takeaway('Key takeaway', 'Use one dark-teal takeaway box per page at most, for the single point a skim-reader must not miss.'),
      P('“A pull quote in the Quote style, for a client or stakeholder voice.”', { style: 'Quote' }),
    ], { headers: { default: header('Report title') }, footers: { default: footer('insighture.com') } }),
  ]);

  // ---- Filled sample report (.docx) ------------------------------------------
  const sample = make([
    section(cover(roseBg, 'Platform review', [white('Modernising for '), whiteEm('speed'), white(' and control')],
      'How the delivery platform performed in the year after migration, and what to do next.', 'October 2026 · Insighture'), {}),
    section([
      P('Executive summary', { style: 'Eyebrow' }),
      P([new TextRun('Faster releases, '), em('fewer'), new TextRun(' failures')], { heading: HeadingLevel.HEADING_1 }),
      P('In the twelve months since the move to the new platform, the team ships nearly twice as often and fixes problems faster. The gains are real but uneven, and two areas need attention before the next phase.', { style: 'Lead' }),
      stats([['47%', 'shorter lead time for changes'], ['3.2×', 'more frequent deployments'], ['−38%', 'change failure rate']]),
      spacer(),
      P('What changed', { heading: HeadingLevel.HEADING_2 }),
      P('Deployment moved from a weekly, manually approved release train to on-demand releases through an automated pipeline. Environments are now created from code, and every change runs the same checks.'),
      bullet('Lead time for changes fell from 14.2 to 7.5 days.'),
      bullet('Deployments rose from 4 to 13 a month.'),
      bullet('Rollbacks now take minutes instead of hours.'),
      P('Results by quarter', { heading: HeadingLevel.HEADING_2 }),
      dataTable(['Quarter', 'Lead time (days)', 'Deploys / month', 'Failure rate'], [
        ['Q1 2025', '14.2', '4', '21%'], ['Q2 2025', '13.8', '5', '19%'], ['Q3 2025', '11.1', '8', '16%'],
        ['Q4 2025', '9.4', '10', '14%'], ['Q1 2026', '8.2', '12', '13%'], ['Q2 2026', '7.5', '13', '13%'],
      ]),
      P('Source: delivery pipeline telemetry, median per quarter.', { style: 'Caption', spacing: { before: 80 } }),
      spacer(120),
      takeaway('Key takeaway', 'The platform has paid for itself in delivery speed. The remaining risk is in testing, not tooling.'),
      P('Where it fell short', { heading: HeadingLevel.HEADING_2 }),
      P('Automated test coverage grew more slowly than release frequency, so a larger share of defects now reach production before they are caught. Two legacy services were never moved and still need the old release process.'),
      P('“The pipeline changed how we work. We stopped batching changes because we were afraid of them.”', { style: 'Quote' }),
      P('Recommendations', { heading: HeadingLevel.HEADING_2 }),
      step('Raise automated test coverage on the five highest-change services to 80% by Q1.'),
      step('Retire or migrate the two remaining legacy services.'),
      step('Pilot AI-assisted code review on one team and measure defect escape rate.'),
    ], { headers: { default: header('Platform review · October 2026') }, footers: { default: footer('insighture.com') } }),
  ]);

  // ---- Letterhead (.dotx) ------------------------------------------------------
  const letterHeader = new Header({ children: [
    new Paragraph({ tabStops: [{ type: TabStopType.RIGHT, position: CONTENT }], children: [
      logo(logos.black, 140),
      new TextRun({ text: '\tinsighture.com', size: pt(t.caption), color: muted }),
    ] }),
  ] });
  const letterFooter = new Footer({ children: [new Paragraph({
    border: { top: { style: BorderStyle.SINGLE, size: 4, color: rule, space: 6 } },
    children: [new TextRun({ text: 'Insighture · Street address · City, State Postcode · ABN 00 000 000 000', size: pt(t.caption), color: muted })],
  })] });
  const letter = make([section([
    spacer(600),
    P('13 October 2026'),
    spacer(120),
    P([new TextRun({ text: 'Recipient name', bold: true })], { spacing: { after: 0 } }),
    P('Role, Company', { spacing: { after: 0 } }),
    P('Street address', { spacing: { after: 0 } }),
    P('City, State Postcode'),
    spacer(120),
    P([new TextRun({ text: 'Subject line of the letter', bold: true, size: pt(t.h3) })]),
    P('Dear Recipient,'),
    P('Body text is DM Sans 10.5 pt. Keep letters to one page where you can: one paragraph for context, one for the substance, and one for the next step.'),
    P('Replace this text with your letter. The header and footer carry the logo and company details on every page, so the body needs nothing else.'),
    P('Kind regards,', { spacing: { before: 240, after: 720 } }),
    P([new TextRun({ text: 'Your name', bold: true })], { spacing: { after: 0 } }),
    P([new TextRun({ text: 'Role · name@insighture.com', color: muted })]),
  ], { headers: { default: letterHeader }, footers: { default: letterFooter } })]);

  const dir = path.join(outDir, 'word');
  await fs.mkdir(dir, { recursive: true });
  const files = {
    reportTemplate: path.join(dir, 'Insighture-report.dotx'),
    reportSample: path.join(dir, 'Insighture-report-sample.docx'),
    letterhead: path.join(dir, 'Insighture-letterhead.dotx'),
  };
  const write = async (doc, file, template) => {
    const buf = await Packer.toBuffer(doc);
    if (!template) return fs.writeFile(file, buf);
    const tmp = file.replace(/\.dotx$/, '.tmp.docx');
    await fs.writeFile(tmp, buf);
    await toTemplate(tmp, file);
    await fs.rm(tmp);
  };
  await write(guide, files.reportTemplate, true);
  await write(sample, files.reportSample, false);
  await write(letter, files.letterhead, true);
  return files;
}
