# Insighture templates

Ready-to-use brand templates, generated from the design tokens. Don't edit the
output files by hand: change the generator in `scripts/templates/` (or the
tokens) and rebuild, so every template stays in step with the system.

```bash
npm run templates                 # rebuild everything
npm run templates -- pptx docx    # or just some: pptx docx pdf email social
```

## What's here

| File | Use it for |
| --- | --- |
| `powerpoint/Insighture.potx` | **PowerPoint template.** Open it (or set it as a theme) to start a deck with the brand layouts: Title (rose), Section (dark teal), Title and Content, Two Content, Title Only, Big Number, Quote (dark teal) and Closing (rose). It includes nine example slides; delete the ones you don't need. Works in Keynote and Google Slides via import. |
| `powerpoint/Insighture-sample.pptx` | The same deck as a normal presentation, to copy slides from. |
| `word/Insighture-report.dotx` | **Word report template**: rose cover page, running header and footer, and every brand style (Title, Heading 1–3, Lead, Eyebrow, Quote, Caption, Table Header/Text, and the **Serif Emphasis** character style). |
| `word/Insighture-report-sample.docx` | A filled-in report showing the styles, stat row, data table and key-takeaway box in use. |
| `word/Insighture-letterhead.dotx` | **Letterhead** with the logo header and company-details footer. |
| `pdf/Insighture-report.pdf` | A4 report PDF: cover, summary, chart, table, takeaway and back cover. |
| `pdf/Insighture-one-pager.pdf` | A4 one-pager: rose hero, service cards, stats and CTA band. |
| `pdf/src/*.html` | The editable sources for the PDFs. They use the real token CSS. Edit the copy, then run `npm run templates -- pdf`. |
| `email/newsletter.html` | Email template: table layout with inline styles, a solid-colour fallback behind the gradient, and Arial / Georgia font fallbacks. |
| `social/linkedin-1200x627.png` | LinkedIn post / link-preview card. |
| `social/quote-1080x1080.png` | Square testimonial card. |
| `social/stat-1080x1350.png` | Portrait stat card. |
| `assets/*.png` | The rose and dark-teal backgrounds the Office templates use (16:9 and A4), and transparent PNGs of the logo (`logo-black`, `logo-white`, `logo-white-mono`). |

The PDFs embed their fonts. The email loads them from Google Fonts where the
mail client allows it.

## Install the fonts first (Office and Keynote)

PowerPoint, Word and Keynote use the fonts installed on your machine. Without
them you'll see the fallback (Arial).

1. Download **DM Sans** and **DM Serif Display** from Google Fonts:
   [DM Sans](https://fonts.google.com/specimen/DM+Sans) ·
   [DM Serif Display](https://fonts.google.com/specimen/DM+Serif+Display).
2. Install the files from the **`static/`** folder of the DM Sans download,
   not the variable `DMSans[opsz,wght].ttf`. Office on Windows and
   LibreOffice don't handle the variable font and fall back to another
   typeface.
3. Install both DM Serif Display files (Regular and Italic).

## Using the serif emphasis

The brand's signature is one or two headline words in **DM Serif Display
italic**: "We own the problem, not just *the solution*".

- **PowerPoint:** select the words, set the font to DM Serif Display, turn
  **bold off** and *italic* on. On white slides, make them rose (theme colour
  Accent 1).
- **Word:** select the words and apply the **Serif Emphasis** character
  style.
- **Web / PDF:** wrap them in `<em>` inside a heading.

Use it once per title, in headings only, never in body text.

## Notes

- Office headings use **DM Sans Bold**. The web uses SemiBold (600), but
  Office only reliably offers regular and bold of a family.
- The Office theme (Design › Colours / Fonts) is set to the brand palette:
  Accent 1 rose, Accent 2 teal, Accent 3 orange, Accent 4 yellow, Accent 5
  indigo, Dark 2 dark teal. Charts and SmartArt pick it up automatically.
- Every template uses the real logo from `brand/logo/`: black on white,
  white (rose dot) on dark teal, and all-white on rose.
- The email references `logo-white-mono.png` by a relative path. Upload it to
  your site or email platform and change the `src` to that URL before
  sending.
- Contact details, addresses and the ABN in the letterhead and email are
  placeholders. Fill them in once in the generator, then rebuild.
