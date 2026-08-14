---
category: Typography
---

# Link

Inline navigation. Underlined by default because underlines are how links are recognised.

## Usage

```tsx
<Link href="/reports">View the report</Link>
<Link href="https://insighture.com" external>Insighture</Link>
```

## Guidance

- `external` adds `target="_blank"`, the safe `rel`, and a visual marker.
- `subtle` drops the underline until hover — for dense navigation only, never in prose.
- Use Button for actions; Link is for navigation.
