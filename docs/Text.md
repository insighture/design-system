---
category: Typography
---

# Text

Body copy and every non-heading string. Carries the tone, size and weight scales.

## Usage

```tsx
<Text relaxed>Body copy at 16px with a 1.5 line height.</Text>
<Text size="sm" tone="secondary">Supporting detail</Text>
<Text size="xs" caps tone="tertiary">Eyebrow label</Text>
```

## Guidance

- `tone` is semantic (`secondary`, `tertiary`, `danger`) — never set colour directly.
- `caps` is the uppercase micro-label: eyebrows, table headers.
- `relaxed` for long-form paragraphs; `truncate` for single-line ellipsis.
- `weight="semibold"` (600) is the new middle step — use it for emphasis inside dense UI where bold is too heavy.
