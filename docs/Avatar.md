---
category: Data Display
---

# Avatar

Represents a person or an organisation. Falls back from image to initials automatically.

## Usage

```tsx
<Avatar name="Chathushka Perera" status="online" />
<Avatar name="Insighture" square size="lg" />
```

## Guidance

- Always pass `name` — it supplies the image alt text and the initials fallback.
- `square` for organisations and products; circular for people.
- `status` renders a presence ring; omit it outside presence-aware contexts.
