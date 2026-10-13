---
category: Data Display
---

# Tag

A categorical label — a topic, team or bucket. Unlike Badge, `color` is chosen for distinguishability, not meaning.

## Usage

```tsx
<Tag color="rose" swatch>Design</Tag>
<Tag color="teal" swatch>Engineering</Tag>
<Tag color="neutral" onRemove={() => remove(id)}>Archived</Tag>
```

## Guidance

- **The chip is neutral; the colour lives in the `swatch` only.** Pass `swatch` whenever the category colour matters — without it the tag is a plain grey chip.
- Colours are categorical. Assign them consistently per category and never to imply status.
- Prefer `neutral` when the category needs no colour coding — most do not.
- `onRemove` renders a dismiss control with the right accessible label.
- Swatch colours are the brand palette: `rose`, `teal`, `orange`, `yellow`, `indigo`. Use them in that order as categories are added.
