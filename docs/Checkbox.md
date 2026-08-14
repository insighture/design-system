---
category: Forms
---

# Checkbox

A single boolean choice, with optional hint text.

## Usage

```tsx
<Checkbox label="Email me weekly insights" hint="A digest every Monday." />
<Checkbox label="Select all" indeterminate />
```

## Guidance

- `indeterminate` is the mixed state for a "select all" row — it is visual only, the underlying value is still boolean.
- For a set of mutually exclusive options use RadioGroup; for on/off settings that apply immediately use Switch.
