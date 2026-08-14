---
category: Navigation
---

# Tabs

Switches between sibling views without leaving the page. Fully keyboard accessible: arrows move, Home/End jump, disabled tabs are skipped.

## Usage

```tsx
<Tabs
  items={[
    { id: 'overview', label: 'Overview', content: <Overview /> },
    { id: 'activity', label: 'Activity', badge: 12, content: <Activity /> },
    { id: 'billing', label: 'Billing', disabled: true },
  ]}
/>
```

## Guidance

- `underline` (default) for page-level navigation; `pill` for compact in-card switches like a date range.
- Only the active panel is mounted — do not rely on hidden panels holding state.
- `badge` carries a count without breaking the tab rhythm.
- Use for peer views only. If one view is a drill-down of another, navigate instead.
