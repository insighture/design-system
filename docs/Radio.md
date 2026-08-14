---
category: Forms
---

# Radio

One option within a RadioGroup. Rarely used alone — the group injects `name` and checked state.

## Usage

```tsx
<Radio value="growth" label="Growth" hint="Up to 25 seats" />
```

## Guidance

- Always render inside a RadioGroup; the group owns `name` and selection.
- `hint` is where the differentiating detail goes (price, limits).
