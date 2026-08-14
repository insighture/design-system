---
category: Overlays
---

# Modal

A focused dialog for a decision or a short task. Traps focus, restores it on close, locks body scroll, and closes on Escape.

## Usage

```tsx
<Modal
  open={open}
  onClose={close}
  title="Publish this workspace?"
  description="Everyone in your organisation gets access immediately."
  footer={
    <>
      <Button variant="ghost" onClick={close}>Cancel</Button>
      <Button onClick={publish}>Publish</Button>
    </>
  }
>
  <Text size="sm" tone="secondary">You can revoke access at any time.</Text>
</Modal>
```

## Guidance

- Renders in place rather than through a portal — mount it near the root of the provider.
- Set `closeOnOverlayClick={false}` for destructive or data-losing flows.
- Always give it a `title`; it becomes the dialog’s accessible name.
- Keep it to one decision. Anything longer belongs on its own page.
