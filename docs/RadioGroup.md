---
category: Forms
---

# RadioGroup

A set of mutually exclusive options, wrapped in a fieldset with a legend.

## Usage

```tsx
<RadioGroup label="Plan" name="plan" value={plan} onValueChange={setPlan}>
  <Radio value="starter" label="Starter" hint="Up to 3 seats" />
  <Radio value="growth" label="Growth" hint="Up to 25 seats" />
</RadioGroup>
```

## Guidance

- Controlled via `value` + `onValueChange`, or uncontrolled via `defaultValue`.
- `horizontal` for two or three short options; keep it vertical when options carry hints.
- Use Select instead once there are more than about six options.
