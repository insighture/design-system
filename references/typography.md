# Typography

Two families, both free on Google Fonts (SIL Open Font License):

- **DM Sans** for everything: headings, body, tables, UI, captions and slides.
  Where it may be missing (shared Office files, email), fall back to **Arial**.
- **DM Serif Display, italic**, the emphasis face. Only for one or two words
  *inside* a headline: "We own the problem, not just *the solution*",
  "AWS Advanced *partners*". Regular weight, in rose on white, white on rose
  or dark teal, or rose on dark teal. Fallback **Georgia Italic**. Once per
  title. Never body text, whole headlines, buttons or labels.

Never Calibri, Times, Cambria, Inter, Roboto, or any other face.

| Weight | Use |
| --- | --- |
| 400 Regular | Body copy, intro paragraphs |
| 500 Medium | UI labels, buttons, emphasis inside body |
| 600 Semibold | **All headings and titles**, table headers, eyebrows |
| 700 Bold | Key figures, names in testimonials, rare extra weight |

Headings are semibold, not bold (in Office, which only reliably has regular
and bold, use Bold). Letter-spacing tightens as size grows, to about
`-0.025em` at display sizes.

**Eyebrows** (the small label above a title): 11–12pt, uppercase, semibold,
`+0.1em` tracking, in indigo, teal or rose on light; teal on dark.

## Type scales by medium

| Role | Web (px) | Document (pt) | Slides 16:9 (pt) |
| --- | --- | --- | --- |
| Display / cover title | 48–60 | 28 | 54 |
| Title / H1 | 36 | 20 | 36 |
| H2 | 28 | 15 | 22 |
| H3 | 22 | 12 | 18 (semibold) |
| Body | 16 | 10.5 | 18 |
| Small / table | 14 | 9 | 14 |
| Caption / footnote | 12 | 8 | 11 |

Line height: 1.5 body, 1.2–1.25 headings, 1.0–1.1 display. Paragraph spacing
about half a line, not a blank line.

## Getting the fonts

- **Web:** load both as a weight **range**, or 500/600 silently render as 400:
  `https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=DM+Serif+Display:ital@0;1&display=swap`
- **Office / Keynote:** install the **static** DM Sans files and DM Serif
  Display locally before using the templates (`templates/README.md`).
- **PDF:** embed DM Sans.
