---
category: Actions
---

# IconButton

An icon-only control. Requires `aria-label` because there is no visible text to announce.

## Usage

```tsx
<IconButton aria-label="Settings" variant="outline">⚙</IconButton>
<IconButton aria-label="Add item" variant="primary" round>+</IconButton>
```

## Guidance

- `aria-label` is mandatory and must describe the action, not the icon.
- Shares Button variants, so an icon action matches its text counterpart.
- Pair with Tooltip when the icon is not self-evident.
