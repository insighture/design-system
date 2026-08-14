---
category: Data Display
---

# CardHeader

Title row of a Card, separated from the body by a hairline. Lays out as a space-between row, so a title and a trailing badge or action align correctly.

## Usage

```tsx
<CardHeader>
  <Heading level={3} size="xs">Pipeline health</Heading>
  <Badge tone="success" dot>Healthy</Badge>
</CardHeader>
```

## Guidance

- Expects one or two children: the heading, and optionally a trailing element.
- Only meaningful inside a Card.
