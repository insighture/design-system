---
category: Layout
---

# Stack

Flex layout primitive over the spacing scale. The default way to space anything — reach for it before writing a custom flex rule.

## Usage

```tsx
<Stack direction="row" gap="md" align="center" justify="between">
  <Heading level={3} size="xs">Pipeline health</Heading>
  <Badge tone="success" dot>Healthy</Badge>
</Stack>
```

## Guidance

- `gap` takes space-scale names (`xs` … `3xl`), never raw pixels.
- `responsive` collapses a row to a column below 640px.
- Use `as` to keep semantics right (`as="ul"`, `as="section"`).
