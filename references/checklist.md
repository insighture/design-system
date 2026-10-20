# Check before you ship

## Run the brand checker

If you can run code and produced a file (.pptx, .docx, .xlsx, .html, .svg,
.css, .pdf), run the checker and fix every **ERROR**; review each
**WARNING**:

```bash
python3 scripts/check_brand.py output.pptx      # --json for machine-readable output
```

Python 3, no dependencies. It flags off-palette colours (with the nearest
brand colour), non-brand fonts, a missing or redrawn logo, more than one rose
shape per slide, long serif runs and unloaded web fonts. It can't judge
layout, so also go through the list.

## The list

- [ ] Only DM Sans, plus DM Serif Display italic for one or two headline
      words (Arial / Georgia as fallbacks).
- [ ] Neutrals carry the page; dark teal appears only as a ground.
- [ ] Exactly **one** rose moment per page, slide or view.
- [ ] Headings semibold; buttons pills; cards 18px radius.
- [ ] Alt colours only to distinguish things; status as dots or icons.
- [ ] Small text meets contrast: no `#EE4065`, teal or yellow body text on
      white.
- [ ] 4px spacing grid, consistent radii, no heavy shadows.
- [ ] The real logo, in the right version for its ground, at or above
      minimum size, with clear space.
- [ ] No hex values outside the palette; no default theme colours left in
      Office files or charts.
