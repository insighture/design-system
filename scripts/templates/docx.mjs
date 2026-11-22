/**
 * Insighture Word template: the letterhead (.dotx). A4, DM Sans, brand styles
 * registered as real Word styles so letters built on it stay consistent and
 * restyle in one place.
 *
 * Documents (proposals, statements of work, reports) use Insighture's internal
 * document template instead, which isn't published here: see GUIDELINES.md,
 * "The internal document format". It replaced the report template that this
 * script used to generate (insighture-design-system 3.0.0).
 */
import {
  AlignmentType, BorderStyle, Document, Footer, Header, ImageRun, LevelFormat, Packer, Paragraph,
  TabStopType, TextRun,
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
  const section = (children, opts = {}) => ({
    properties: { page: { size: PAGE, margin: { top: MARGIN + 200, bottom: MARGIN, left: MARGIN, right: MARGIN, header: 600, footer: 600 } }, ...opts.properties },
    headers: opts.headers, footers: opts.footers, children,
  });

  const spacer = (after = 240) => P('', { spacing: { after } });
  const logos = { black: await fs.readFile(assets.logoBlack) };
  // Inline logo, sized by width in px (96 dpi).
  const logo = (data, width) => new ImageRun({ type: 'png', data, transformation: { width, height: Math.round(width / LOGO_RATIO) },
    altText: { name: 'Insighture', title: 'Insighture', description: 'Insighture logo' } });
  const make = (sections) => new Document({
    creator: 'Insighture', title: 'Insighture letterhead', styles, numbering,
    features: { updateFields: false }, sections,
  });

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
  await write(letter, files.letterhead, true);
  return files;
}
