# Colour

## Main palette

| Name | Hex | RGB | Use it for |
| --- | --- | --- | --- |
| White | `#FCFCFD` | 252 252 253 | Pages, slides, surfaces, text on dark |
| Black | `#15181A` | 21 24 26 | Body text, headings, the strongest button on light |
| Dark teal | `#08242B` | 8 36 43 | Grounds only: covers, title/section slides, hero bands, footers, dark mode |
| Crimson rose | `#EE4065` | 238 64 101 | The accent: key number, key word, primary call to action, highlights |

## Alt palette

| Name | Hex | RGB | Use it for |
| --- | --- | --- | --- |
| Teal | `#0FA2BF` | 15 162 191 | Support and info, second data series, links on dark |
| Orange | `#FF8102` | 255 129 2 | Categorical colour, illustration |
| Yellow | `#FAB400` | 250 180 0 | Warning, highlight marker, categorical colour. Never text. |
| Indigo | `#4F46E5` | 79 70 229 | Categorical colour, data, eyebrows |

## Functional colours (not brand colours)

| Role | Hex | Use |
| --- | --- | --- |
| Success | `#17A06A` | Status only: dots, icons, ticks |
| Danger | `#D93A2B` | Status only: errors, destructive actions. Deliberately more orange than rose, so it never reads as the accent. |

## Neutrals (most of every page)

`#FCFCFD` · `#F6F7F8` · `#EEF0F1` · `#E1E4E6` · `#CBD0D3` · `#9EA5AA` ·
`#6B7278` · `#555C62` · `#3E4449` · `#2A2E32` · `#1D2023` · `#15181A`

Text: primary `#15181A`, secondary `#555C62`, muted `#6B7278`. Rules and
borders: `#E1E4E6` (subtle) and `#CBD0D3` (default). Tinted panels: `#EEF0F1`.
Rose tint (key-cell highlight): `#FCF0F3`.

## On dark teal

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

## Gradients: two, with two jobs

- **Rose gradient** `linear-gradient(90deg, #E63A5F 0%, #B61639 100%)` is a
  *surface*: hero and CTA bands with white text and white or outlined pill
  buttons on top.
- **Brand gradient** (rose → orange → yellow) is *decoration only*: thin cover
  strips and dividers, never behind text.

No other gradients, and no purple-to-blue "AI" gradients.

## Proportion

Roughly, by area, on any page or slide:

```
White / Black / neutrals  ███████████████████████████████████  ~75%
Dark teal                 ███████                               ~15%  (covers, bands, dark slides)
Crimson rose              ██                                    ~5%   (one element per view, or one hero/CTA band)
Alt colours               ██                                    ~5%   (charts, categories)
```

## The rules

1. **One rose moment per view.** One per page, slide, section or screen: a
   rose-gradient hero or CTA band, the key figure, the call to action, or the
   serif-italic headline words. If two things are rose, neither is important.
2. **Dark teal is a ground, not a decoration.** Use it as full backgrounds or
   bands. Don't use it for small text or thin lines on white.
3. **Alt colours are for telling things apart.** Charts, categories, tags,
   illustrations and diagrams. They never replace rose as the accent, and
   they're never large surfaces.
4. **Status colours are small.** A dot, an icon or a thin bar, never a filled
   coloured box or coloured body text. Tags and badges are neutral with a
   coloured dot.
5. **No hex values outside this palette.** No default Tailwind, Material or
   Office palettes. `brand/palette.json` lists every allowed hex by token
   name; `brand/tokens.css` has the full token set.

## Contrast (WCAG AA)

| Pair | Ratio | OK for |
| --- | --- | --- |
| Black on white | 17.4:1 | Everything |
| White on dark teal | 15.8:1 | Everything |
| White on rose | 3.8:1 | Bold text ≥ 14pt / 18px, buttons, large headings. **Not small body text.** |
| Rose `#B11032` on white | 6.9:1 | Small accent text on white (use this, not `#EE4065`) |
| Rose `#F58AA1` on dark teal | 7.0:1 | Small accent text on dark teal |
| Teal `#0FA2BF` on white | 3.0:1 | Fills and icons only. For text, use `#0A5D7A`. |
| Yellow `#FAB400` on white | 1.8:1 | Fills only. Never text. |
