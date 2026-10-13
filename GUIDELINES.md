# Insighture brand guidelines

One visual system for **everything**: Word documents, PDFs, slide decks,
spreadsheets, websites, email, social posts, diagrams and charts. The React
package in this repo is just one way to apply it. The rules below work in any
medium.

---

## 1. The look in one paragraph

Confident, warm and modern, as on [insighture.com](https://www.insighture.com).
Content sits on white, set in black **DM Sans**. **Crimson rose** is the brand's
signature: a rose-gradient hero or call-to-action band, the one key action, or
one or two headline words set in **DM Serif Display italic**. **Dark teal** is
the brand ground for covers, title slides, testimonial sections and dark mode.
The alt colours (teal, orange, yellow, indigo) only appear where things need
telling apart, as in charts, categories, card accents and illustrations.
Rounded shapes (pill buttons, 18px cards), generous space, and nothing
decorative that doesn't carry meaning.

---

## 2. Colour

### Main palette

| Swatch | Name | Hex | RGB | Use it for |
| --- | --- | --- | --- | --- |
| ⬜ | White | `#FCFCFD` | 252 252 253 | Pages, slides, surfaces, text on dark |
| ⬛ | Black | `#15181A` | 21 24 26 | Body text, headings, the strongest button on light |
| 🟦 | Dark teal | `#08242B` | 8 36 43 | Backgrounds: covers, title/section slides, hero bands, footers, dark mode |
| 🟥 | Crimson rose | `#EE4065` | 238 64 101 | The accent: key number, key word, primary call to action, highlights |

### Alt palette

| Name | Hex | RGB | Use it for |
| --- | --- | --- | --- |
| Teal | `#0FA2BF` | 15 162 191 | Support and info, second data series, links on dark |
| Orange | `#FF8102` | 255 129 2 | Categorical colour, illustration |
| Yellow | `#FAB400` | 250 180 0 | Warning, highlight marker, categorical colour |
| Indigo | `#4F46E5` | 79 70 229 | Categorical colour, data |

### Functional colours (not brand colours)

| Role | Hex | Use |
| --- | --- | --- |
| Success | `#17A06A` | Status only: dots, icons, ticks |
| Danger | `#D93A2B` | Status only: errors, destructive actions. It's deliberately more orange than rose, so it never reads as the accent. |

### Neutrals (most of every page)

`#FCFCFD` · `#F6F7F8` · `#EEF0F1` · `#E1E4E6` · `#CBD0D3` · `#9EA5AA` ·
`#6B7278` · `#555C62` · `#3E4449` · `#2A2E32` · `#1D2023` · `#15181A`

Text: primary `#15181A`, secondary `#555C62`, muted `#6B7278`. Rules and
borders: `#E1E4E6` (subtle) and `#CBD0D3` (default). Tinted panels: `#EEF0F1`.

### On dark teal

| Role | Hex |
| --- | --- |
| Ground | `#08242B` |
| Raised panel / card | `#0C2E36` |
| Subtle fill | `#12383F` |
| Rule / border | `#1A4450`, `#23525E` |
| Text primary | `#FCFCFD` |
| Text secondary | `#A9C0C5` |
| Text muted | `#7E9AA1` |
| Accent | `#EE4065` (fills), `#F58AA1` (small text) |
| Support | `#55D8F2` |

### Proportion

Use roughly this much of each, by area, on any page or slide:

```
White / Black / neutrals  ███████████████████████████████████  ~75%
Dark teal                 ███████                               ~15%  (covers, bands, dark slides)
Crimson rose              ██                                    ~5%   (one element per view, or one hero/CTA band)
Alt colours               ██                                    ~5%   (charts, categories)
```

### The rules

1. **One rose moment per view.** That means one per page, slide, section or
   screen: a rose-gradient hero or CTA band, the key figure, the call to
   action, or the serif-italic headline words. If two things are rose,
   neither is important.
2. **Dark teal is a ground, not a decoration.** Use it as full backgrounds or
   bands. Don't use it for small text or thin lines on white.
3. **Alt colours are for telling things apart.** Use them in charts,
   categories, tags, illustrations and diagrams. They never replace rose as
   the accent, and they're never used as large surfaces.
4. **Status colours are small.** Show status with a dot, an icon or a thin
   bar, never as a filled coloured box or coloured body text.
5. **Two gradients, two jobs.** The **rose gradient** (`#E63A5F → #B61639`,
   90°) is a surface: hero and CTA bands with white text and white or
   outlined pill buttons on top. The **brand gradient** (rose → orange →
   yellow) is decoration only: cover strips and dividers, never behind text.

### Contrast (WCAG AA)

| Pair | Ratio | OK for |
| --- | --- | --- |
| Black on white | 17.4:1 | Everything |
| White on dark teal | 15.8:1 | Everything |
| White on rose | 3.8:1 | Bold text ≥ 14pt / 18px, buttons, large headings. **Not small body text.** |
| Rose `#B11032` on white | 6.9:1 | Small accent text on white (use this, not `#EE4065`) |
| Rose `#F58AA1` on dark teal | 7.0:1 | Small accent text on dark teal |
| Teal `#0FA2BF` on white | 3.0:1 | Fills and icons only. For text, use `#0A5D7A`. |
| Yellow `#FAB400` on white | 1.8:1 | Fills only. Never text. |

---

## 3. Typography

Two families, both on Google Fonts:

- **DM Sans** for headings, body, tables, captions and slides. Where it may be
  missing (shared Office files, email), fall back to **Arial**.
- **DM Serif Display, italic**, the emphasis face. Use it only for one or two
  words *inside* a headline: "We own the problem, not just *the solution*",
  "AWS Advanced *partners*". Set it in rose (white on rose or dark grounds,
  or rose on dark teal) at regular weight. Its fallback is **Georgia
  Italic**. Never use it for body text, whole headlines, buttons or labels.

Never use Calibri, Times or Cambria, and don't add other faces.

| Weight | Use |
| --- | --- |
| 400 Regular | Body copy, intro paragraphs |
| 500 Medium | UI labels, buttons, emphasis inside body |
| 600 Semibold | **All headings and titles**, table headers, eyebrows |
| 700 Bold | Key figures, names in testimonials, rare extra weight |

Headings are semibold, not bold. Letter-spacing tightens as size grows, to
about `-0.025em` at display sizes, with a line height of about 1.0–1.05 for
display text. **Eyebrows** (the small label above a title) are 11–12pt,
uppercase, semibold, with wide tracking (`+0.1em`), in indigo, teal or rose on
light, and teal on dark.

### Type scales by medium

| Role | Web (px) | Document (pt) | Slides 16:9 (pt) |
| --- | --- | --- | --- |
| Display / cover title | 48–60 | 28 | 54 |
| Title / H1 | 36 | 20 | 36 |
| H2 | 28 | 15 | 22 |
| H3 | 22 | 12 | 18 (semibold) |
| Body | 16 | 10.5 | 18 |
| Small / table | 14 | 9 | 14 |
| Caption / footnote | 12 | 8 | 11 |

Line height: 1.5 for body, 1.2–1.25 for headings, 1.1 for display. Paragraph
spacing should be about half a line, not a blank line.

---

## 4. Space, shape and layout

- **Grid:** 4px base. Use steps of 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96.
  Between blocks, 16/24/32 is the default.
- **Radius:** pill for buttons, tags and toggles; 6 for small chips and
  inputs; 18 for cards, panels and image frames; 48 for large feature panels.
  Round icon buttons and avatar circles. Use the same radius at the same
  level throughout one piece of work.
- **Elevation:** soft and rare. Use a 1px `#E1E4E6` border **or** a faint
  shadow, never both, and never hard drop shadows.
- **Alignment:** left-aligned text, ragged right. Centre only short titles on
  covers.
- **Margins:** documents ≥ 20mm (A4) / 0.75in (Letter). Slides ≥ 0.5in safe
  area. Web content max width 72rem (1152px), and ~68 characters for prose.
- **Section rhythm (web, long documents):** alternate white sections with
  dark teal ones, and use a rose-gradient band for the hero or the closing
  call to action. Don't put two rose bands next to each other.
- **Cards:** white, 18px radius, a soft shadow or a 1px `#E1E4E6` border,
  generous padding (24–32px). A tinted icon tile (40–56px, 10px radius, alt
  colour at ~15% tint) sits top-left. Each card in a set may take its own
  alt colour for its icon and "Learn more ›" link.
- **White space is the brand.** When in doubt, remove an element rather than
  shrink everything to fit.

---

## 5. Applying it, by medium

Start from the ready-made files in [`templates/`](templates/README.md) (PowerPoint, Word,
PDF, email and social) rather than a blank document.

### Documents (Word, Google Docs, PDF reports, letters)

- Page: white `#FCFCFD` (pure white `#FFFFFF` is fine in print). Body DM Sans
  10.5pt, `#15181A`, line spacing 1.3, 6pt after paragraphs.
- Headings: DM Sans SemiBold, black. H1 20pt, H2 15pt, H3 12pt. Optional 11pt
  rose or indigo uppercase eyebrow above H1. The document title may set one
  or two words in DM Serif Display italic, in rose.
- **Cover:** full-bleed dark teal `#08242B` or rose-gradient page, or a top
  band ≥ ⅓ of the page. White title 28–36pt semibold with an optional serif
  italic emphasis word, secondary text `#A9C0C5` (on teal) or white at 85%
  (on rose).
- Tables: header fill `#EEF0F1`, header text 9pt semibold uppercase `#555C62`;
  body 9–10pt; horizontal rules only, in `#E1E4E6` 0.5pt; zebra rows, if used,
  in `#F6F7F8`.
- Callouts: a `#EEF0F1` box with no border and a small coloured marker or
  icon. For a key-takeaway callout, use a dark teal box with white text, at
  most one per page.
- Footer: 8pt muted grey, with page numbers on the right.

### Presentations (PowerPoint, Keynote, Google Slides)

- 16:9. Apply the theme: **dk1** `#15181A`, **lt1** `#FCFCFD`,
  **dk2** `#08242B`, **lt2** `#EEF0F1`, **accent1** `#EE4065`,
  **accent2** `#0FA2BF`, **accent3** `#FF8102`, **accent4** `#FAB400`,
  **accent5** `#4F46E5`, **accent6** `#555C62`, **hyperlink** `#15181A`.
  Heading and body fonts: DM Sans. Emphasis words: DM Serif Display italic.
- **Title slide:** a rose-gradient ground (`#E63A5F → #B61639`) with a white
  58pt semibold title, one or two words in white DM Serif Display italic, a
  white subtitle, and a white pill shape for the call to action or date.
- **Section and closing slides:** dark teal ground, white title, rose serif
  italic key word, and a teal or rose uppercase eyebrow.
- **Content slides:** white ground, black title 32–36pt semibold (optional
  rose serif italic word), body 18pt `#3E4449`, and a 12pt uppercase eyebrow
  above the title.
- **Big-number slides:** the figure in rose 72–120pt semibold, with a black
  or white label underneath.
- One rose element per slide, ≤ 6 bullets, one idea per slide. Leave at least
  40% of the slide empty. No clip-art, bevels, 3D or heavy shadows.

### Websites and web pages

- Use the package (`@insighture/design-system`) where React is available.
  Otherwise use the CSS variables in `src/styles/tokens.css` and
  `semantic.css`, or the snippet below.
- Hero: a rose-gradient band with a white 60px semibold heading, one or two
  words in white DM Serif Display italic, and a white pill "Let's talk"
  button with rose text. A dark teal hero with a rose serif word works too.
- Section headings on white: black semibold with a rose serif italic phrase
  ("Great outcomes start with the *right thinking.*").
- Buttons are **pills**. On light, primary is black and emphasis is rose. On
  dark teal, primary is rose and emphasis is white. On rose, use white
  (filled, rose text) or outlined white. Use only one emphasis button per
  page.
- Links in prose: black with an underline, turning rose on hover. On dark,
  use white with an underline.
- Load the fonts with the weight as a range:
  `fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=DM+Serif+Display:ital@0;1`.

```css
:root {
  --ins-font-sans: 'DM Sans', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, Arial, sans-serif;
  --ins-font-serif: 'DM Serif Display', Georgia, serif;
  --ins-gradient-rose: linear-gradient(90deg, #E63A5F 0%, #B61639 100%);
  --ins-brand-white: #FCFCFD; --ins-brand-black: #15181A; --ins-brand-deep-teal: #08242B; --ins-brand-rose: #EE4065;
  --ins-brand-teal: #0FA2BF; --ins-brand-orange: #FF8102; --ins-brand-yellow: #FAB400; --ins-brand-indigo: #4F46E5;
  --ins-text-primary: #15181A; --ins-text-secondary: #555C62; --ins-text-tertiary: #6B7278; --ins-text-accent: #B11032;
  --ins-border-subtle: #E1E4E6; --ins-bg-subtle: #EEF0F1;
}
body { font-family: var(--ins-font-sans); background: var(--ins-brand-white); color: var(--ins-text-primary); }
h1, h2, h3 { font-weight: 600; letter-spacing: -0.025em; }
h1 em, h2 em { font-family: var(--ins-font-serif); font-style: italic; font-weight: 400; color: var(--ins-brand-rose); }
```

### Spreadsheets (Excel, Sheets)

- DM Sans 10pt (Arial fallback). Header row: fill `#EEF0F1`, bold black, bottom
  border `#CBD0D3`. Freeze it.
- Numbers right-aligned with consistent formats. Show negatives in danger red
  only where the sign actually matters.
- Highlight the key cell or row in a `#FCF0F3` fill with rose bold text, once
  per sheet. Show status with icon sets or data bars, not full-cell fills.

### Charts and diagrams

- **Series order:** rose `#EE4065` → dark teal `#08242B` → teal `#0FA2BF` →
  yellow `#FAB400` → indigo `#4F46E5` → orange `#FF8102`. On a dark ground,
  use white in place of dark teal.
- To spotlight one series or bar, make it rose and make the rest `#9EA5AA`
  (or `#3E4449`).
- Gridlines `#E1E4E6` hairline, axis labels 10–11pt `#6B7278`. No 3D, no
  chart borders, no gradient fills, and the legend only if labels can't sit
  on the data.
- Diagrams: black 1.5px strokes, `#EEF0F1` boxes with 10–16px radius, a dark
  teal fill for the focal node, and rose for the single critical path.

### Email and social

- Email: 600px column, white body, rose-gradient or dark teal header band,
  DM Sans with an Arial fallback, and one rose pill button (semibold 16px,
  white text).
- Social cards: a rose-gradient or dark teal ground, white semibold headline
  with one serif italic word, and soft circular shapes as the only
  decoration. Keep text on ≤ 25% of the image area.

---

## 6. Logo

<img src="docs/assets/logo.png" alt="The Insighture logo in its four versions" width="100%">

The logo is the lowercase **Insighture** wordmark with a crimson-rose dot on
the *i*. Use the supplied files; never retype the wordmark in a font.

| Version | File | Use it on |
| --- | --- | --- |
| **Primary** (black, rose dot) | `brand/logo/insighture-logo-black.svg` | White and light neutral grounds. The default. |
| **Reversed** (white, rose dot) | `brand/logo/insighture-logo-white.svg` | Dark teal and black grounds. |
| **White mono** (all white) | `brand/logo/insighture-logo-white-mono.svg` | Rose and rose-gradient grounds, where the rose dot would disappear, and photographs. |
| **Black mono** (all black) | `brand/logo/insighture-logo-black-mono.svg` | Single-colour print, engraving, fax, and where rose can't be reproduced. |

PNG exports for Office and email (transparent, 1420 × 336 px) are in
`templates/assets/logo-*.png`.

**Clear space:** keep a margin of at least the height of the lowercase
letters (about half the logo's height) on every side, free of text and other
graphics.

**Minimum size:** 80 px wide on screen and 20 mm wide in print. Below that
the dot and the thin strokes fill in.

**Placement:** top-left is the default on covers, slides, letterheads and
pages. On running headers and slide footers, use it small (about 6 mm or
0.24 in tall) at the left margin.

**Don't:**
- recolour the wordmark or the dot, other than switching between the four
  versions above;
- put the rose-dot versions on rose (use white mono);
- stretch, condense, rotate, outline or add effects such as shadows or
  glows;
- place it on busy imagery without enough contrast (use white mono on a
  dark area of the photo, or don't use it there);
- lock it up with other text or logos without a clear-space gap.

## 7. Checklist before you ship anything

- [ ] Only DM Sans, plus DM Serif Display italic for headline emphasis words,
      is used (Arial / Georgia as fallbacks).
- [ ] Neutrals carry the page, and dark teal appears only as a ground.
- [ ] There's exactly **one** rose moment per page, slide or view: a band,
      the CTA, or the serif italic words.
- [ ] Headings are semibold and buttons are pills.
- [ ] Alt colours appear only to distinguish things (charts, categories).
- [ ] Status is shown with dots or icons, not coloured blocks or coloured
      text.
- [ ] Small text meets contrast: no rose `#EE4065`, teal or yellow body text
      on white.
- [ ] Spacing is on the 4px grid, with consistent radii and no heavy shadows.
- [ ] The logo is the supplied file, in the right version for its ground, at or
      above minimum size with clear space.
- [ ] There are no hex values outside this palette.
