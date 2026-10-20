# Web: HTML pages, Claude artifacts, React, dashboards

<!-- claude-only -->
If the Artifact tool or a design-system picker offers an **Insighture**
design system, choose it. Otherwise apply this file.
<!-- /claude-only -->

## Which route

1. **React codebase with `@insighture/design-system`:** import
   `@insighture/design-system/styles.css`, wrap the app in
   `<InsightureProvider defaultTheme="light">` (nothing is styled without it:
   it sets `data-ins-theme`, which the token layer keys off), and use its
   components. Index: `references/components.md`; each component's API and
   guidance is in `docs/<Component>.md`. Don't restyle them with raw hex.
2. **Any other HTML or framework:** use `brand/tokens.css` (the full token set:
   primitives plus light and dark-teal semantic roles, `--ins-*`).
3. **No files available:** the minimum below.

```html
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=DM+Serif+Display:ital@0;1&display=swap" rel="stylesheet">
<style>
:root {
  --ins-font-sans: 'DM Sans', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, Arial, sans-serif;
  --ins-font-serif: 'DM Serif Display', Georgia, serif;
  --ins-gradient-rose: linear-gradient(90deg, #E63A5F 0%, #B61639 100%);
  --ins-white: #FCFCFD; --ins-black: #15181A; --ins-deep-teal: #08242B; --ins-rose: #EE4065;
  --ins-teal: #0FA2BF; --ins-orange: #FF8102; --ins-yellow: #FAB400; --ins-indigo: #4F46E5;
  --ins-text: #15181A; --ins-text-2: #555C62; --ins-text-3: #6B7278; --ins-text-accent: #B11032;
  --ins-border: #E1E4E6; --ins-bg-subtle: #EEF0F1; --ins-radius-card: 18px;
}
@media (prefers-color-scheme: dark) { :root {
  --ins-white: #08242B; --ins-black: #FCFCFD; --ins-text: #FCFCFD; --ins-text-2: #A9C0C5; --ins-text-3: #7E9AA1;
  --ins-text-accent: #F58AA1; --ins-border: #1A4450; --ins-bg-subtle: #12383F;
} }
body { font-family: var(--ins-font-sans); background: var(--ins-white); color: var(--ins-text); }
h1, h2, h3 { font-weight: 600; letter-spacing: -0.025em; }
h1 em, h2 em { font-family: var(--ins-font-serif); font-style: italic; font-weight: 400; color: var(--ins-rose); }
</style>
```

## Rules

- Load the fonts as a weight **range** (as above) or 500/600 silently render
  as 400.
- **Dark mode is dark teal**, not black or grey. Light and dark are both
  first-class.
- **Buttons are pills.** On light: primary black, emphasis rose (one per
  page). On dark teal: primary rose, emphasis white. On rose: white filled
  with rose text, or outlined white.
- **Hero:** a rose-gradient band with a white 48–60px semibold heading, one
  white serif-italic phrase, and a white pill CTA ("Let's talk") with rose
  text. Or dark teal with a rose serif word.
- Section headings on white: black semibold with a rose serif-italic phrase
  ("Great outcomes start with the *right thinking.*").
- **Links in prose:** black with an underline, rose on hover; on dark, white
  with an underline.
- Logo top-left in the header, inlined as SVG (`references/logo.md`).
- Page rhythm, cards and radii: `references/layout.md`. Charts:
  `references/charts.md`.
