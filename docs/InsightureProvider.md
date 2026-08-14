---
category: Foundations
---

# InsightureProvider

Root of every Insighture surface. Sets the `data-ins-theme` attribute the token layer keys off, so any component rendered outside a provider is unstyled. Wrap the whole app in exactly one.

## Usage

```tsx
<InsightureProvider defaultTheme="light">
  <App />
</InsightureProvider>
```

## Guidance

- Required. Every other component assumes it is inside one.
- Controlled (`theme` + `onThemeChange`) or uncontrolled (`defaultTheme`).
- Read the active theme from `useInsightureTheme()` — it also returns `toggleTheme`.
- Set `fullBleed={false}` when a host page already paints the background.
