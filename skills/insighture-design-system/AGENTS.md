<!-- Generated from SKILL.md by `npm run skill` in github.com/insighture/design-system. Do not edit. -->
<!-- Instructions for AI assistants and coding agents: apply these rules to anything visual you make for Insighture. -->

# Insighture design system

Version 2 (rebrand: DM Sans, crimson rose, dark teal). Source of truth:
`github.com/insighture/design-system` — `GUIDELINES.md` there wins if it ever
disagrees with this file.

Apply this to **every** visual thing you make for an Insighture person, unless
they explicitly ask for another brand (e.g. a client's own brand) — then follow
theirs and say so. If other instructions or skills cover *how to build* a
file (docx, pptx, xlsx, pdf, frontend, dataviz), follow them for that and
these rules for *how it looks*. Where they conflict on colour, type, logo or
tone, these rules win.

## Bundled files

Paths are relative to this file's folder. Some installs copy only this file —
check before relying on them, and fall back to the inline values and the
inline logo in the appendix.

| File | Use |
| --- | --- |
| `assets/logo/insighture-logo-{black,white,white-mono,black-mono}.svg` | The logo. Never redraw or retype it. |
| `assets/logo/logo-{black,white,white-mono}.png` | Transparent 1420×336 PNGs for Office, PDF and email. |
| `assets/templates/Insighture.potx` | **Start every PowerPoint deck from this.** Layouts: Title (rose), Section (dark teal), Title and Content, Two Content, Title Only, Big Number, Quote, Closing. |
| `assets/templates/Insighture-report.dotx` | **Start every Word report from this.** Rose cover, header/footer, all brand styles incl. the *Serif Emphasis* character style. |
| `assets/templates/Insighture-letterhead.dotx` | Letters and memos. |
| `assets/templates/newsletter.html` | Email (table layout, inline styles, fallbacks). |
| `references/tokens.css` | The full token set (primitives + light/dark semantic roles) for HTML. |
| `references/palette.json` | Every allowed hex, by token name. |
| `scripts/check_brand.py` | **Brand checker** (Python 3, no dependencies). Run it on every file you produce; see section 8. |

## 1. The look in one paragraph

Confident, warm and modern, like insighture.com. Content sits on white, set in
black **DM Sans**. **Crimson rose** is the signature: a rose-gradient hero or
call-to-action band, the one key action, or one or two headline words set in
**DM Serif Display italic**. **Dark teal** is the ground for covers, title
slides, testimonial sections and dark mode. The alt colours (teal, orange,
yellow, indigo) only appear where things need telling apart — charts,
categories, card accents. Rounded shapes (pill buttons, 18px cards), generous
space, nothing decorative that doesn't carry meaning.

## 2. Colour

| Name | Hex | Use |
| --- | --- | --- |
| White | `#FCFCFD` | Pages, slides, surfaces, text on dark |
| Black | `#15181A` | Body text, headings, strongest button on light |
| Dark teal | `#08242B` | Grounds only: covers, title/section slides, hero bands, footers, dark mode |
| Crimson rose | `#EE4065` | THE accent: key number, key word, primary CTA |
| Teal (alt) | `#0FA2BF` | Support/info, 2nd data series, links on dark |
| Orange (alt) | `#FF8102` | Categorical, illustration |
| Yellow (alt) | `#FAB400` | Warning, highlight marker, categorical — never text |
| Indigo (alt) | `#4F46E5` | Categorical, data, eyebrows |
| Success | `#17A06A` | Status only (dots, icons, ticks) |
| Danger | `#D93A2B` | Status only: errors, destructive actions |

**Neutrals** (most of every page): `#FCFCFD · #F6F7F8 · #EEF0F1 · #E1E4E6 · #CBD0D3 · #9EA5AA · #6B7278 · #555C62 · #3E4449 · #2A2E32 · #1D2023 · #15181A`.
Text primary `#15181A`, secondary `#555C62`, muted `#6B7278`. Borders `#E1E4E6`
(subtle) / `#CBD0D3` (default). Tinted panels `#EEF0F1`. Rose tint `#FCF0F3`.

**On dark teal:** ground `#08242B`, raised card `#0C2E36`, subtle fill
`#12383F`, rules `#1A4450`/`#23525E`, text `#FCFCFD` / `#A9C0C5` / `#7E9AA1`,
accent `#EE4065` (fills) / `#F58AA1` (small text), support `#55D8F2`.

**Gradients — two, with two jobs:**
- Rose gradient `linear-gradient(90deg, #E63A5F 0%, #B61639 100%)` — a *surface*: hero and CTA bands with white text and white/outlined pill buttons on top.
- Brand gradient (rose → orange → yellow) — *decoration only*: thin cover strips and dividers, never behind text.

**Proportion by area:** neutrals ~75%, dark teal ~15%, rose ~5%, alts ~5%.

**Rules**
1. **One rose moment per view** (page, slide, section, screen): a rose band, *or* the key figure, *or* the CTA, *or* the serif-italic words. Two rose things = neither matters.
2. Dark teal is a ground, never small text or thin lines on white.
3. Alt colours distinguish things; they never replace rose as the accent and are never large surfaces.
4. Status is small: a dot, icon or thin bar — never a filled coloured box or coloured body text. Tags/badges are neutral with a coloured dot.
5. No hex values outside this palette. No purple-blue "AI" gradients, no default Tailwind/Material/Office palettes.

**Contrast (WCAG AA):** white on rose only for bold ≥14pt/18px, buttons, large
headings. Small accent text on white → `#B11032`, never `#EE4065`. Small accent
text on dark teal → `#F58AA1`. Teal text on white → `#0A5D7A`. Yellow is never
text.

## 3. Typography

- **DM Sans** for everything: headings, body, tables, UI, slides. Fallback **Arial** (Office, email).
- **DM Serif Display italic** — the emphasis face, *only* for one or two words inside a headline: "We own the problem, not just *the solution.*" Regular weight, in rose (on white) or white (on rose / dark teal) or rose on dark teal. Fallback Georgia Italic. Never body text, whole headlines, buttons or labels. Once per title.
- Never Calibri, Times, Cambria, Inter, Roboto, or any other face.
- Weights: 400 body · 500 UI labels/buttons · **600 all headings**, table headers, eyebrows · 700 key figures (Office headings use Bold, since Office only reliably has regular/bold).
- Letter-spacing tightens with size (≈ `-0.025em` at display); line height 1.5 body, 1.2–1.25 headings, 1.0–1.1 display.
- **Eyebrow** (label above a title): 11–12pt, uppercase, semibold, `+0.1em` tracking, in indigo, teal or rose on light; teal on dark.

| Role | Web (px) | Document (pt) | Slides (pt) |
| --- | --- | --- | --- |
| Display / cover | 48–60 | 28 | 54 |
| H1 / title | 36 | 20 | 36 |
| H2 | 28 | 15 | 22 |
| H3 | 22 | 12 | 18 |
| Body | 16 | 10.5 | 18 |
| Small / table | 14 | 9 | 14 |
| Caption | 12 | 8 | 11 |

## 4. Space, shape, layout

- 4px grid: 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96. Between blocks 16/24/32.
- Radius: **pill** for buttons, tags, toggles; 6 chips/inputs; **18 cards**, panels, image frames; 48 large feature panels.
- Elevation: a 1px `#E1E4E6` border **or** a faint shadow (`0 1px 3px rgba(21,24,26,.09)`), never both, never hard drop shadows.
- Left-aligned, ragged right. Centre only short cover titles.
- Margins: documents ≥ 20mm; slides ≥ 0.5in; web max width 1152px, prose ~68ch.
- Long pages: alternate white and dark-teal sections; rose band for the hero or closing CTA, never two rose bands adjacent.
- Cards: white, 18px radius, 24–32px padding, optional 40–56px icon tile (10px radius, alt colour at ~15% tint); each card in a set may take its own alt colour.
- White space is the brand. When in doubt, remove an element.

## 5. By medium

### Claude artifacts, HTML, React, dashboards
- In a React codebase that has `@insighture/design-system`: import `@insighture/design-system/styles.css`, wrap in `<InsightureProvider defaultTheme="light">` (nothing is styled without it), and use its components (Button, Card, Heading, Text, Stack, Tabs, Badge, Tag, Alert, Modal, form controls). Don't restyle them with raw hex.
- Otherwise use `references/tokens.css` if present, else this minimum:

```html
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=DM+Serif+Display:ital@0;1&display=swap" rel="stylesheet">
<style>
:root {
  --ins-font-sans: 'DM Sans', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, Arial, sans-serif;
  --ins-font-serif: 'DM Serif Display', Georgia, serif;
  --ins-gradient-rose: linear-gradient(90deg, #E63A5F 0%, #B61639 100%);
  --ins-white: #FCFCFD; --ins-black: #15181A; --ins-deep-teal: #08242B; --ins-rose: #EE4065;
  --ins-teal: #0FA2BF; --ins-orange: #FF8102; --ins-yellow: #FAB400; --ins-indigo: #4F46E5;
  --ins-text: #15181A; --ins-text-2: #555C62; --ins-text-3: #6B7278; --ins-text-accent: #B11032;
  --ins-border: #E1E4E6; --ins-bg-subtle: #EEF0F1; --ins-radius-card: 18px;
}
@media (prefers-color-scheme: dark) { :root {
  --ins-white: #08242B; --ins-black: #FCFCFD; --ins-text: #FCFCFD; --ins-text-2: #A9C0C5; --ins-text-3: #7E9AA1;
  --ins-text-accent: #F58AA1; --ins-border: #1A4450; --ins-bg-subtle: #12383F;
} }
body { font-family: var(--ins-font-sans); background: var(--ins-white); color: var(--ins-text); }
h1, h2, h3 { font-weight: 600; letter-spacing: -0.025em; }
h1 em, h2 em { font-family: var(--ins-font-serif); font-style: italic; font-weight: 400; color: var(--ins-rose); }
</style>
```
- Always load the fonts as a weight **range** (as above) or 500/600 silently render as 400.
- Dark mode = dark teal, not black or grey.
- Buttons are pills. On light: primary black, emphasis rose (one per page). On dark teal: primary rose, emphasis white. On rose: white filled with rose text, or outlined white.
- Hero: rose-gradient band, white 48–60px semibold heading with one white serif-italic phrase, white pill CTA ("Let's talk") with rose text. Or dark teal with a rose serif word.
- Links in prose: black + underline, rose on hover; on dark, white + underline.
- Put the logo top-left in headers (inline the SVG; see Appendix).

### PowerPoint (.pptx) — and slides in any tool
- Start from `assets/templates/Insighture.potx` when available. If generating from scratch (pptxgenjs, python-pptx), replicate the theme: dk1 `#15181A`, lt1 `#FCFCFD`, dk2 `#08242B`, lt2 `#EEF0F1`, accent1 `#EE4065`, accent2 `#0FA2BF`, accent3 `#FF8102`, accent4 `#FAB400`, accent5 `#4F46E5`, accent6 `#555C62`, hyperlink `#15181A`; major/minor font DM Sans.
- 16:9. **Title / closing:** rose-gradient ground, white 54–58pt title with one or two words in white DM Serif Display italic (bold off), white subtitle, white pill for date/CTA, white-mono logo.
- **Section / quote:** dark teal ground, white title, rose serif-italic key word, teal or rose eyebrow, white (rose-dot) logo.
- **Content:** white ground, 12pt eyebrow, black 32–36pt title, body 18pt `#3E4449`, small black logo bottom-left (~0.24in tall).
- **Big number:** figure in rose 72–120pt, label beneath in black/white.
- One rose element per slide, ≤ 6 bullets, one idea per slide, ≥ 40% empty. No clip-art, bevels, 3D, heavy shadows, stock "AI" imagery.

### Word (.docx), Google Docs, PDF documents, letters
- Start from `assets/templates/Insighture-report.dotx` (reports) or `Insighture-letterhead.dotx` (letters) when available.
- Page white; body DM Sans 10.5pt `#15181A`, line spacing 1.3, 6pt after.
- Headings DM Sans semibold (Bold in Office), black: H1 20pt, H2 15pt, H3 12pt. Optional 11pt rose/indigo uppercase eyebrow above H1. Title may set one or two words in DM Serif Display italic, rose.
- Cover: full-bleed dark teal or rose gradient (or a top band ≥ ⅓ page), white 28–36pt title, secondary `#A9C0C5` on teal / white 85% on rose, logo top-left in the right version.
- Tables: header fill `#EEF0F1`, header text 9pt semibold uppercase `#555C62`, body 9–10pt, horizontal rules only `#E1E4E6` 0.5pt, zebra (if any) `#F6F7F8`.
- Callouts: `#EEF0F1` box, no border, small coloured marker. Key takeaway: dark teal box with white text, max one per page.
- Footer 8pt muted grey, page numbers right. Margins ≥ 20mm. PDFs embed DM Sans.

### Excel (.xlsx), Sheets
- DM Sans 10pt (Arial fallback). Header: fill `#EEF0F1`, bold black, bottom border `#CBD0D3`, frozen.
- Numbers right-aligned, consistent formats; negatives in `#D93A2B` only when the sign matters.
- Highlight the one key cell/row: `#FCF0F3` fill, rose bold text, once per sheet. Status via icon sets/data bars, not full-cell fills. Gridlines off for presentation sheets.

### Charts and diagrams
- Series order: rose `#EE4065` → dark teal `#08242B` → teal `#0FA2BF` → yellow `#FAB400` → indigo `#4F46E5` → orange `#FF8102`. On dark grounds use white in place of dark teal. Prefer fewer series over more colours.
- Spotlight: the series/bar that matters in rose, the rest `#9EA5AA` (or `#3E4449`).
- Gridlines `#E1E4E6` hairline, axis labels 10–11pt `#6B7278`. No 3D, chart borders, gradient fills; label data directly instead of a legend where possible.
- Diagrams: black 1.5px strokes, `#EEF0F1` boxes with 10–16px radius, dark teal fill for the focal node, rose for the single critical path.

### Email and social
- Email: 600px column, white body, rose-gradient (with solid `#EE4065` fallback) or dark teal header band, DM Sans → Arial, one rose pill button (semibold 16px, white text). Images by absolute URL. Start from `assets/templates/newsletter.html` when available.
- Social: rose-gradient or dark teal ground, white semibold headline with one serif-italic word, soft circles as the only decoration, text ≤ 25% of the image. LinkedIn 1200×627, square 1080×1080, portrait 1080×1350.

## 6. Logo

Lowercase **insighture** wordmark with a crimson-rose dot on the *i*. Use the
supplied file or the inline SVG below — **never retype the wordmark in a font,
redraw it, or invent a logo mark.**

| Version | Wordmark / dot | Use on |
| --- | --- | --- |
| Primary | `#15181A` / `#EE4065` | White and light neutrals (default) |
| Reversed | `#FCFCFD` / `#EE4065` | Dark teal, black |
| White mono | `#FCFCFD` / `#FCFCFD` | Rose and rose gradient, photos |
| Black mono | `#15181A` / `#15181A` | Single-colour print |

Clear space ≥ half the logo's height on every side. Minimum 80px wide on
screen, 20mm in print. Top-left by default; ~6mm / 0.24in tall in running
headers and slide footers. Don't recolour beyond the four versions, put a
rose-dot version on rose, stretch, rotate, outline, add shadows/glows, or lock
it up with other text without clear space.

## 7. Voice (for any copy you write into the artifact)

Plain, confident, specific. Short sentences, active voice, no hype words
("revolutionary", "cutting-edge", "synergy"), no exclamation marks. Headlines
make a claim ("We own the problem, not just *the solution.*"). Australian/British
spelling (colour, organisation). Sentence case for headings and buttons.

## 8. Before you finish — check it

If you can run code and produced a file (.pptx, .docx, .xlsx, .html, .svg,
.css, .pdf), run the checker and fix every **ERROR** before handing it over;
review each **WARNING**:

```bash
python3 scripts/check_brand.py output.pptx      # add --json for machine-readable output
```

It flags off-palette colours (with the nearest brand colour), non-brand fonts,
a missing logo, more than one rose shape per slide, long serif runs and
unloaded web fonts. It can't judge layout, so also go through the checklist:

- [ ] Only DM Sans (+ DM Serif Display italic for 1–2 headline words); Arial/Georgia fallbacks only.
- [ ] Neutrals carry the page; dark teal only as a ground.
- [ ] Exactly **one** rose moment per page/slide/view.
- [ ] Headings semibold; buttons pills; cards 18px radius.
- [ ] Alt colours only to distinguish things; status as dots/icons.
- [ ] Small text passes contrast (no `#EE4065`, teal or yellow body text on white).
- [ ] 4px spacing grid, consistent radii, no heavy shadows.
- [ ] Real logo, correct version for its ground, ≥ minimum size, with clear space.
- [ ] No hex values outside this palette; no default theme colours left in Office files or charts.

## Appendix: inline logo (primary version)

Use when `assets/logo/` isn't available. For other versions, change the
`fill` on the wordmark paths (`#15181A`) and on the last path, the dot
(`#EE4065`), per the table in section 6. Scale with `width`/`height`, keeping
the 355:84 ratio.

```svg
<svg width="355" height="84" viewBox="0 0 355 84" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Insighture">
<path d="M6.07746 65.2519V0H0V65.2519H6.07746Z" fill="#15181A"/>
<path d="M53.5598 65.2519H47.4823V40.7358C47.4823 29.0837 41.4999 23.5839 32.6686 23.5839C23.8372 23.5839 17.8548 29.0837 17.8548 40.7358V65.2519H11.7773V40.7358C11.7773 25.0754 20.5136 17.8977 32.6686 17.8977C44.8235 17.8977 53.5598 25.0754 53.5598 40.7358V65.2519Z" fill="#15181A"/>
<path d="M74.9259 65.9976C84.7068 65.9976 91.7338 61.2435 91.6389 52.6676C91.354 34.3038 65.3349 42.6001 65.3349 30.4819C65.3349 25.8211 69.4182 23.211 74.641 23.211C79.8638 23.211 84.137 25.8211 84.137 30.5752H90.0245C90.0245 22.4653 83.1874 17.8977 74.641 17.8977C66.1895 17.8977 59.2574 22.6517 59.2574 30.1091C59.2574 47.8203 85.3715 39.2443 85.5614 52.5744C85.5614 57.6081 81.763 60.6842 75.0208 60.6842C69.0383 60.6842 64.1953 57.6081 64.1953 52.3879H58.3078C58.3078 60.9639 66.1895 65.9976 74.9259 65.9976Z" fill="#15181A"/>
<path d="M97.2059 65.2519H103.283V18.6434H97.2059V65.2519Z" fill="#15181A"/>
<path d="M133.823 83.8952C147.402 83.8952 158.322 73.1753 158.322 59.8453V41.9476C158.322 28.6176 147.402 17.8977 133.823 17.8977C120.338 17.8977 109.323 28.6176 109.323 41.9476C109.323 55.2776 120.338 65.9976 133.823 65.9976C141.515 65.9976 148.257 62.2689 152.15 56.4895V60.9639C152.15 70.7517 143.888 78.209 133.918 78.209C127.27 78.209 121.763 74.76 118.534 69.4466H111.412C115.211 78.0226 123.852 83.8952 133.823 83.8952ZM133.918 60.3114C123.662 60.3114 115.4 52.2015 115.4 41.9476C115.4 31.6938 123.472 23.5839 133.918 23.5839C144.363 23.5839 152.245 31.6938 152.245 41.9476C152.245 52.2015 144.173 60.3114 133.918 60.3114Z" fill="#15181A"/>
<path d="M184.939 17.8977C178.576 17.8977 173.733 19.762 170.125 25.5414V0H164.048V65.2519H170.125V40.2697C170.125 29.0837 176.107 23.5839 184.939 23.5839C193.77 23.5839 199.753 29.0837 199.753 40.7358V65.2519H205.83V40.7358C205.83 25.0754 197.094 17.8977 184.939 17.8977Z" fill="#15181A"/>
<path d="M232.393 24.3296V18.6434H220.428V3.91511H214.35V18.6434H207.228V24.3296H214.35V43.2527C214.35 57.5149 221.757 64.5061 232.393 65.5315V59.7521C224.986 58.6335 220.428 53.4133 220.428 43.0662V24.3296H232.393Z" fill="#15181A"/>
<path d="M278.627 18.6434V43.1594C278.627 58.8199 269.89 65.9976 257.735 65.9976C245.581 65.9976 236.844 58.8199 236.844 43.1594V18.6434H242.922V43.1594C242.922 54.8116 248.904 60.3114 257.735 60.3114C266.567 60.3114 272.549 54.8116 272.549 43.1594V18.6434H278.627Z" fill="#15181A"/>
<path d="M284.324 65.2519H290.402V41.0155C290.402 29.4566 295.815 24.05 303.791 24.05C304.266 24.05 304.741 24.05 305.216 24.1432V18.457C304.741 18.3637 304.266 18.3637 303.791 18.3637C292.396 18.3637 284.324 25.4482 284.324 41.0155V65.2519Z" fill="#15181A"/>
<path d="M306.662 42.0408C306.662 55.2776 317.203 65.9976 330.877 65.9976C339.993 65.9976 348.54 61.1503 352.908 53.5997H345.501C342.177 57.6081 336.86 60.3114 330.782 60.3114C320.811 60.3114 313.404 53.0404 313.025 43.812H354.807C354.902 43.0662 354.997 42.2273 354.902 41.2951C354.522 27.3126 343.602 17.8977 330.782 17.8977C317.108 17.8977 306.662 28.804 306.662 42.0408ZM313.025 38.7782C314.449 30.3887 321.476 23.5839 330.877 23.5839C339.993 23.5839 346.925 30.2023 348.445 38.7782H313.025Z" fill="#15181A"/>
<path d="M104.088 5.45233C104.088 7.76903 102.21 9.64709 99.893 9.64709C97.5763 9.64709 95.6982 7.76903 95.6982 5.45233C95.6982 3.13563 97.5763 1.25757 99.893 1.25757C102.21 1.25757 104.088 3.13563 104.088 5.45233Z" fill="#EE4065"/>
</svg>
```
