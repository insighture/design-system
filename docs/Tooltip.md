---
category: Overlays
---

# Tooltip

A short hint on hover and on keyboard focus. Escape dismisses it.

## Usage

```tsx
<Tooltip content="Tooltips show on hover and on focus">
  <IconButton aria-label="Settings">⚙</IconButton>
</Tooltip>
```

## Guidance

- The trigger must be a single focusable element, or keyboard users never see the tip.
- Hints only — never put essential information or interactive content in a tooltip.
- Positioned with CSS relative to the trigger, so keep it out of containers that clip overflow.
- An IconButton’s `aria-label` is still required; the tooltip does not replace it.
