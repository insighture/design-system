# Documents (Word, Google Docs, PDF reports, letters)

**Start from a template**, not a blank document:

| Need | File |
| --- | --- |
| Report | `templates/word/Insighture-report.dotx`: rose cover, header/footer, every brand style incl. the *Serif Emphasis* character style |
| Letter or memo | `templates/word/Insighture-letterhead.dotx` |
| Worked example | `templates/word/Insighture-report-sample.docx` |
| PDF report / one-pager | `templates/pdf/Insighture-report.pdf`, `Insighture-one-pager.pdf`; editable HTML sources in `templates/pdf/src/` |

If you must generate from scratch (python-docx, docx.js), match the template:

- Page: white `#FCFCFD` (pure white `#FFFFFF` is fine in print). Body DM Sans
  10.5pt, `#15181A`, line spacing 1.3, 6pt after paragraphs.
- Headings: DM Sans semibold (Bold in Office), black. H1 20pt, H2 15pt,
  H3 12pt. Optional 11pt rose or indigo uppercase eyebrow above H1. The title
  may set one or two words in DM Serif Display italic, in rose.
- **Cover:** full-bleed dark teal `#08242B` or rose-gradient page, or a top
  band ≥ ⅓ of the page. White title 28–36pt semibold with an optional serif
  italic word; secondary text `#A9C0C5` on teal, white at 85% on rose. Logo
  top-left in the right version (`references/logo.md`).
- **Tables:** header fill `#EEF0F1`, header text 9pt semibold uppercase
  `#555C62`; body 9–10pt; horizontal rules only, `#E1E4E6` 0.5pt; zebra rows,
  if any, `#F6F7F8`.
- **Callouts:** a `#EEF0F1` box, no border, a small coloured marker or icon.
  Key takeaway: a dark teal box with white text, at most one per page.
- **Footer:** 8pt muted grey, page numbers on the right.
- Margins ≥ 20mm. PDFs embed DM Sans.
