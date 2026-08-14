---
category: Data Display
---

# Card

A surface that groups related content. Compose with CardHeader, CardBody and CardFooter for the standard rhythm.

## Usage

```tsx
<Card>
  <CardHeader>
    <Heading level={3} size="xs">Pipeline health</Heading>
    <Badge tone="success" dot>Healthy</Badge>
  </CardHeader>
  <CardBody>
    <Text size="sm" tone="secondary">All 14 jobs completed.</Text>
  </CardBody>
  <CardFooter>
    <Button variant="ghost" size="sm">Dismiss</Button>
    <Button size="sm">View report</Button>
  </CardFooter>
</Card>
```

## Guidance

- `elevated` (default) for content on the canvas; `outlined` when nested inside another surface; `filled` for a recessed panel.
- `accent` tints the card with the brand accent — at most one per view.
- `interactive` adds hover lift and focus ring for cards that are whole click targets; give it a real focusable element too.
- Use `padding="none"` when the card holds an edge-to-edge table or image.
