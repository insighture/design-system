---
category: Data Display
---

# Badge

A small status label. `tone` is semantic — it says what state something is in, not what colour you want.

## Usage

```tsx
<Badge tone="success" dot>Healthy</Badge>
<Badge tone="danger" variant="solid">Critical</Badge>
<Badge tone="highlight" variant="outline">Beta</Badge>
```

## Guidance

- **A badge carries no colour except its dot.** Surface and label are always neutral; `tone` colours the dot alone. Pass `dot` whenever the tone must be visible — without it the badge is deliberately a plain grey chip.
- `soft` (default, subtle grey), `outline` (bordered), `solid` (ink chip for high emphasis, still not colourful).
- `dot` adds the one filled colour a badge gets. Pass it whenever the tone matters at a glance.
- Use Tag instead when the label is a category rather than a state.
