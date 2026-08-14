---
category: Data Display
---

# CardBody

Main content region of a Card. Stacks its children with consistent spacing and absorbs the remaining height.

## Usage

```tsx
<CardBody>
  <Text size="sm" tone="secondary">Median runtime dropped 12%.</Text>
  <Progress value={92} tone="success" label="Success rate" showValue />
</CardBody>
```

## Guidance

- Flexes to fill, so footers stay pinned to the bottom in equal-height card grids.
- Only meaningful inside a Card.
