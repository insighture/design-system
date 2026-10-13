---
category: Actions
---

# Button

The primary action control. Variants encode loudness, not colour.

## Usage

```tsx
<Button>Save changes</Button>
<Button variant="emphasis" size="lg">Start free trial</Button>
<Button variant="ghost" onClick={onCancel}>Cancel</Button>
<Button loading>Saving</Button>
```

## Guidance

- `primary` — one per view; the thing to do on this screen. It is **black on the light theme and crimson rose on the dark-teal theme**, so it always reads as the heaviest control on the ground it sits on.
- `emphasis` is the second step — **rose on light, white on dark teal**. Reserve it for the single most important action on a marketing or onboarding surface.
- `secondary` / `outline` / `ghost` descend in weight; pair a ghost Cancel with a primary Confirm.
- `danger` for destructive actions only.
- `loading` swaps the label for a spinner and blocks interaction — the width does not jump.
