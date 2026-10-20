# Presentations (PowerPoint, Keynote, Google Slides)

**Start every deck from `templates/powerpoint/Insighture.potx`.** Layouts:
Title (rose), Section (dark teal), Title and Content, Two Content, Title Only,
Big Number, Quote, Closing. `templates/powerpoint/Insighture-sample.pptx`
shows nine worked slides.

Generating from scratch (pptxgenjs, python-pptx)? Replicate the theme:

| Slot | Hex | | Slot | Hex |
| --- | --- | --- | --- | --- |
| dk1 | `#15181A` | | accent2 | `#0FA2BF` |
| lt1 | `#FCFCFD` | | accent3 | `#FF8102` |
| dk2 | `#08242B` | | accent4 | `#FAB400` |
| lt2 | `#EEF0F1` | | accent5 | `#4F46E5` |
| accent1 | `#EE4065` | | accent6 | `#555C62` |
| hyperlink | `#15181A` | | fonts | DM Sans (major and minor) |

- 16:9.
- **Title / closing:** rose-gradient ground (`#E63A5F → #B61639`), white
  54–58pt semibold title with one or two words in white DM Serif Display
  italic (bold off), white subtitle, a white pill for the date or CTA,
  white-mono logo.
- **Section / quote:** dark teal ground, white title, rose serif-italic key
  word, teal or rose uppercase eyebrow, reversed (white, rose-dot) logo.
- **Content:** white ground, 12pt uppercase eyebrow, black 32–36pt semibold
  title (optional rose serif word), body 18pt `#3E4449`, small black logo
  bottom-left (~0.24in tall).
- **Big number:** the figure in rose 72–120pt semibold, a black or white
  label beneath.
- One rose element per slide, ≤ 6 bullets, one idea per slide, ≥ 40% of the
  slide empty. No clip-art, bevels, 3D, heavy shadows or stock "AI" imagery.
- Charts on slides follow `references/charts.md`.
