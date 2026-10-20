---
name: insighture-design-system
description: "Insighture brand and design system (DM Sans + DM Serif Display italic, crimson rose #EE4065, dark teal #08242B, the Insighture logo). Use whenever creating, styling or editing ANY artifact or visual output for Insighture or its clients — Claude artifacts and HTML pages, React UI, dashboards, Word/.docx, PDF, PowerPoint/.pptx decks and slides, Excel/.xlsx, charts, diagrams, reports, proposals, one-pagers, letters, emails, social posts, mockups. Load it alongside the docx/pptx/xlsx/pdf/frontend/artifact skills: they say how to build the file, this says how it must look. Overrides any generic or default palette and fonts."
---

# Insighture design system

Version 2 (rebrand: DM Sans, crimson rose, dark teal). Source:
`github.com/insighture/design-system`.

Apply this to **every** visual thing you make for an Insighture person, unless
they explicitly ask for another brand (e.g. a client's own) — then follow
theirs and say so. Other skills (docx, pptx, xlsx, pdf, frontend, dataviz) say
*how to build* a file; this says *how it must look*. Where they conflict on
colour, type, logo or tone, this wins.

This file has the rules that always apply. For the task in hand, read the
matching file below before you start.

## Read next, by task

| Making… | Read | Start from |
| --- | --- | --- |
| A slide deck | `references/slides.md` | `templates/powerpoint/Insighture.potx` |
| A report, letter, memo or PDF | `references/documents.md` | `templates/word/Insighture-report.dotx`, `Insighture-letterhead.dotx` |
| A web page, Claude artifact, dashboard or React UI | `references/web.md`, `references/components.md` | `brand/tokens.css` |
| A spreadsheet | `references/spreadsheets.md` | |
| A chart or diagram | `references/charts.md` | |
| An email or social post | `references/email-social.md` | `templates/email/newsletter.html`, `templates/social/` |
| Anything with the logo | `references/logo.md` | `brand/logo/*.svg`, `templates/assets/logo-*.png` |
| Detail on colour, type, spacing or voice | `references/colour.md`, `typography.md`, `layout.md`, `look-and-voice.md` | `brand/palette.json` |
| A final check | `references/checklist.md` | `scripts/check_brand.py` |

Paths are relative to this file. How you reach them depends on how this skill
reached you:

- **As a folder** (Claude Code, Codex, Windsurf, Devin, a zip uploaded to
  claude.ai, or synced by Tracelet): read them from disk.
- **Through the Tracelet MCP Gateway** (claude.ai, ChatGPT and other browser
  clients with the Tracelet connector): call `read_skill_file` with slug
  `insighture-design-system` and the path, e.g. `references/slides.md`.
- **As this text only** (Cursor rules, Copilot instructions, a Custom GPT or
  Gem prompt): no files. Everything below is enough on its own, and the
  appendix has the logo.

## The look

Confident, warm and modern, like insighture.com. Content sits on white, set in
black **DM Sans**. **Crimson rose** is the signature: a rose-gradient hero or
call-to-action band, the one key action, or one or two headline words in
**DM Serif Display italic**. **Dark teal** is the ground for covers, title
slides, testimonial sections and dark mode. The alt colours (teal, orange,
yellow, indigo) only appear where things need telling apart. Pill buttons,
18px cards, generous space, nothing decorative that doesn't carry meaning.

## Colour

| Name | Hex | Use |
| --- | --- | --- |
| White | `#FCFCFD` | Pages, slides, surfaces, text on dark |
| Black | `#15181A` | Body text, headings, strongest button on light |
| Dark teal | `#08242B` | Grounds only: covers, title/section slides, bands, footers, dark mode |
| Crimson rose | `#EE4065` | THE accent: key number, key word, primary CTA |
| Teal (alt) | `#0FA2BF` | Support/info, 2nd data series, links on dark |
| Orange (alt) | `#FF8102` | Categorical, illustration |
| Yellow (alt) | `#FAB400` | Warning, highlight, categorical. Never text |
| Indigo (alt) | `#4F46E5` | Categorical, data, eyebrows |
| Success / Danger | `#17A06A` / `#D93A2B` | Status only (dots, icons) |

Neutrals carry most of every page: `#FCFCFD · #F6F7F8 · #EEF0F1 · #E1E4E6 ·
#CBD0D3 · #9EA5AA · #6B7278 · #555C62 · #3E4449 · #2A2E32 · #1D2023 ·
#15181A`. Text `#15181A` / `#555C62` / `#6B7278`; borders `#E1E4E6` /
`#CBD0D3`; tinted panels `#EEF0F1`. On dark teal: cards `#0C2E36`, text
`#FCFCFD` / `#A9C0C5`, small accent text `#F58AA1`.

Rose gradient (hero and CTA surfaces only):
`linear-gradient(90deg, #E63A5F 0%, #B61639 100%)`.

1. **One rose moment per view** (page, slide, section, screen). Two rose
   things = neither matters.
2. Dark teal is a ground, never small text or thin lines on white.
3. Alt colours distinguish things; never the accent, never large surfaces.
4. Status is small: a dot, icon or thin bar, never a filled box.
5. No hex outside this palette. No purple-blue "AI" gradients, no default
   Tailwind/Material/Office palettes.

Small accent text on white is `#B11032`, never `#EE4065`. White on rose only
for bold ≥ 14pt/18px, buttons and large headings.

## Type

- **DM Sans** for everything (fallback Arial). Weights: 400 body, 500 UI,
  **600 all headings**, 700 key figures.
- **DM Serif Display italic** only for one or two words inside a headline,
  once per title, regular weight, rose on white or white on rose/dark teal
  (fallback Georgia Italic). "We own the problem, not just *the solution.*"
- Never Calibri, Times, Cambria, Inter, Roboto or any other face.
- Web: load the fonts as a weight range (see `references/web.md`) or 500/600
  render as 400.

## Shape and space

4px grid (4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96). Pill buttons and tags,
18px cards, a border **or** a faint shadow, never both. Left-aligned, ragged
right. White space is the brand: when in doubt, remove an element.

## Voice

Plain, confident, specific. Short sentences, active voice, no hype words, no
exclamation marks. Headlines make a claim. Australian/British spelling.
Sentence case for headings and buttons.

## Before you finish

Run `python3 scripts/check_brand.py <file>` on any file you produced and fix
every ERROR, then go through `references/checklist.md`. Without the files:
one rose moment, only DM Sans (+ serif-italic words), real logo in the right
version, no off-palette hex.

## Appendix: inline logo (primary version)

Use when `brand/logo/` isn't available. For other versions, change the
`fill` on the wordmark paths (`#15181A`) and on the last path, the dot
(`#EE4065`), per the table in `references/logo.md`. Scale with `width`/`height`, keeping
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
