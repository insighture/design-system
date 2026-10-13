---
category: Typography
---

# Heading

Section and display headings, set in DM Sans SemiBold. `level` sets the semantic tag and `size` sets the visual scale. They're deliberately independent, so the document outline stays correct however big something looks.

## Usage

```tsx
<Heading level={1} size="display">We own the problem, not just <em>the solution.</em></Heading>
<Heading level={2} size="md">AWS Advanced <em>partners</em></Heading>
```

## Guidance

- Headings are DM Sans, semibold (600). Pick the `size` and the tracking follows automatically, tightening to -0.025em at display sizes.
- **Serif emphasis:** wrap one or two words in `<em>` and they render in DM Serif Display italic, in the accent colour. That's the brand's signature headline move. Use at most one emphasis run per heading, only at `size="md"` (28px) and up, and never in body text. The full rose passes contrast only at large sizes. On `tone="inverse"` the emphasis inherits the heading colour.
- Never skip heading levels for visual reasons; change `size` instead.
- `balance` evens out line lengths on multi-line display headings.
