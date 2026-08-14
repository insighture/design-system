---
category: Feedback
---

# Spinner

An indeterminate loading indicator for waits with no measurable progress.

## Usage

```tsx
<Spinner />
<Spinner size="sm" tone="current" label={null} />
```

## Guidance

- `tone="current"` inherits the surrounding text colour — that is how it works inside buttons.
- Pass `label={null}` only when a parent already announces the loading state, to avoid double announcements.
- If you know the proportion complete, use Progress instead.
