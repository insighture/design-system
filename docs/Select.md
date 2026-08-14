---
category: Forms
---

# Select

Native select with the design system’s field chrome. Pass `options`, or `children` when you need optgroups.

## Usage

```tsx
<Select
  label="Region"
  placeholder="Choose a region"
  options={[
    { label: 'Colombo (ap-south-1)', value: 'cmb' },
    { label: 'Singapore (ap-southeast-1)', value: 'sin' },
  ]}
/>
```

## Guidance

- `placeholder` renders a disabled first option — pair it with `defaultValue=""`.
- Native on purpose: it gets mobile pickers and keyboard behaviour for free.
