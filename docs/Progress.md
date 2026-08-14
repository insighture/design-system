---
category: Feedback
---

# Progress

A determinate progress bar. Omit `value` for an indeterminate sweep.

## Usage

```tsx
<Progress value={64} label="Migration" showValue />
<Progress tone="success" value={92} size="sm" />
<Progress label="Preparing export" />
```

## Guidance

- `showValue` prints the rounded percentage in tabular figures so it does not jitter as it counts.
- Default `tone="accent"`; switch to `success`/`danger` only when the bar itself carries that meaning.
- Always give it a `label` when it is not adjacent to text that already names the task.
