---
category: Forms
---

# Input

Single-line text field. Owns its own label, hint and error, and wires the accessibility attributes for you.

## Usage

```tsx
<Input
  label="Work email"
  placeholder="you@insighture.com"
  hint="We only use this for workspace invitations."
  required
/>
<Input label="Budget" prefix="$" suffix="USD" />
```

## Guidance

- Pass `label` here rather than rendering your own — `htmlFor`, `aria-describedby` and `aria-invalid` are wired automatically.
- Setting `error` both shows the message and flips the field into the invalid state; it replaces `hint`.
- `prefix`/`suffix` are static affixes (currency, units), not buttons.
