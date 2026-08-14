---
category: Forms
---

# Switch

An immediate on/off setting. Unlike a checkbox, it takes effect as soon as it is flipped.

## Usage

```tsx
<Switch
  label="Product notifications"
  hint="Push alerts for pipeline failures."
  checked={on}
  onChange={(e) => setOn(e.target.checked)}
/>
```

## Guidance

- Use for settings that apply instantly. If the change needs a Save button, use Checkbox.
- `labelPosition="start"` gives the settings-row layout, label left and switch right.
