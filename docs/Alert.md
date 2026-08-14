---
category: Feedback
---

# Alert

An inline message about the state of the system. Deliberately quiet: a neutral card whose only colour is the status icon and any action you pass.

## Usage

```tsx
<Alert tone="success" title="Deployed" onDismiss={close}>
  Version 2.4.0 is live in production.
</Alert>

<Alert
  tone="danger"
  title="Connection lost"
  actions={<Button size="sm" variant="danger">Retry</Button>}
>
  We could not reach the warehouse for the last three attempts.
</Alert>
```

## Guidance

- `variant="default"` (neutral card, coloured icon only) is right nearly always.
- `variant="outline"` tints the whole border; `variant="tinted"` fills the surface — loud, so at most one per view.
- `tone="danger"` renders `role="alert"`; the rest render `role="status"`.
- Put the recovery action in `actions` rather than writing "click here" in the message.
- For transient confirmations prefer a toast; Alert is for state that persists.
