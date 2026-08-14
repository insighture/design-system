---
category: Typography
---

# Heading

Section and display headings, set in Inter Bold. `level` sets the semantic tag; `size` sets the visual scale — they are deliberately independent so the document outline stays correct however big something looks.

## Usage

```tsx
<Heading level={1} size="display">Insight, engineered.</Heading>
<Heading level={2} size="md">Pipeline health</Heading>
```

## Guidance

- The system is a single family (Inter), always bold. There is no font choice to make — pick the `size` and the tracking follows automatically.
- Tracking tightens as size grows (down to -0.035em at display); that size-dependent tracking is what makes the type read as modern rather than default-spaced.
- Never skip heading levels for visual reasons; change `size` instead.
- `balance` evens out line lengths on multi-line display headings.
