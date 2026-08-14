<div align="center">

<img src="docs/assets/hero.png" alt="Insighture Design System" width="880">

<p>
  <img alt="components" src="https://img.shields.io/badge/components-28-FC773B?style=flat-square&labelColor=101315">
  <img alt="themes" src="https://img.shields.io/badge/themes-light%20%2B%20dark-0182CB?style=flat-square&labelColor=101315">
  <img alt="typeface" src="https://img.shields.io/badge/typeface-Inter-101315?style=flat-square&labelColor=101315">
  <img alt="react" src="https://img.shields.io/badge/React-18%2B-101315?style=flat-square&labelColor=101315">
  <img alt="typescript" src="https://img.shields.io/badge/TypeScript-strict-101315?style=flat-square&labelColor=101315">
</p>

**Tokens, primitives and 28 React components for Insighture product surfaces.**

</div>

---

## The system at a glance

Every image below is rendered from the **real compiled components** — not
mockups — so they cannot drift from what the library actually ships.

<img src="docs/assets/components-light.png" alt="Insighture components in the light theme" width="100%">

<img src="docs/assets/components-dark.png" alt="Insighture components in the dark theme" width="100%">

Light and dark are both first-class. Note the button hierarchy inverting between
them: on white the strongest action is ink, on near-black it is coral — because
ink disappears against a dark ground. That runs through dedicated
`--ins-button-*` tokens, so the swap never drags the rest of the accent system
with it.

## Install and use

```bash
npm install
npm run build          # dist/ (ESM + CJS + .d.ts + index.css)
npm run preview        # local showcase on http://127.0.0.1:5273
npm run typecheck
npm run readme:assets  # re-render the images in this README
```

`readme:assets` bundles `src/` and screenshots the scenes in
`scripts/readme-scenes/`, so the images above are always generated from the
current components rather than maintained by hand.

```tsx
import { InsightureProvider, Button, Card, Heading } from '@insighture/design-system';
import '@insighture/design-system/styles.css';

export function App() {
  return (
    <InsightureProvider defaultTheme="light">
      <Card>
        <Heading level={2}>Insight, engineered.</Heading>
        <Button>Get started</Button>
      </Card>
    </InsightureProvider>
  );
}
```

`InsightureProvider` is required. It sets `data-ins-theme`, which is what the
token layer keys off — components rendered outside a provider are unstyled.

## The palette

<img src="docs/assets/palette.png" alt="Insighture colour ramps" width="100%">

Drawn from the Insighture mark, but deliberately **weighted**: the system is
carried by white and near-black, accented with the mark's coral orange, and
blue appears only in small doses.

| Role | Colour | Notes |
| ---- | ------ | ----- |
| Backbone | White → near-black `#101315` | Surfaces, rules, text. Most of any screen. |
| Accent | Coral `#FC773B` | Primary actions, focus, selection, links. |
| Emphasis | Near-black (white in dark mode) | Louder than the accent *because* it isn't a colour. |
| Support | Azure `#0182CB` | Info status, one tag slot, one chart series. Never a surface. |
| Highlight | Yellow `#FFD438` | Warnings and highlights only. |
| Success / danger | Green `#0FA37F`, red `#E23D4F` | Status only. |

The restraint is enforced by the token layer, not by convention: azure is
reachable only through `--ins-support-*` and `--ins-info-*`, so a component
cannot casually become blue. Turning any brand hue into the accent is an edit to
the `--ins-accent-*` block in `semantic.css` and nothing else.

How the ramps were built, since the source colours barely moved:

- **Generated in HLS with hue rotation on the dark steps.** Dropping lightness
  alone turns yellow olive and coral brown. Warm hues rotate toward red as they
  darken; azure rotates toward the wordmark navy. Every shade stays chromatic.
- **One orange family, not two.** `#FC773B` and `#FC9B1F` were near-duplicates.
  Coral carries the ramp; amber survives as `--ins-orange-amber` for places the
  mark itself is reproduced.
- **A red that is clearly not coral**, so danger and the brand accent never read
  as the same signal.
- **Rounder geometry.** The mark is arcs and circles, so radii open up (`sm` 6px
  through `xl` 24px) and controls that can be pills, are.
- **Pills carry no fill.** `Badge` defaults to a neutral chip with a coloured
  dot; `outline` and `solid` are the opt-in louder tiers. `Tag` keeps its colour
  in the swatch. Alerts are neutral cards with a coloured icon and no edge bar.

## Tokens

Three layers, in this order:

1. **Primitives** (`src/styles/tokens.css`) — raw palette ramps, type scale,
   space, radius, elevation, motion. Prefixed `--ins-*`.
2. **Semantic** (`src/styles/semantic.css`) — role-named aliases per theme, e.g.
   `--ins-bg-surface`, `--ins-text-secondary`, `--ins-accent-bg`.
3. **Components** — consume semantic tokens only. That indirection is what makes
   a theme swap change the whole system at once.

Never reference a primitive from a component. If a role is missing, add it to the
semantic layer for both themes.

`src/tokens.ts` mirrors the values in TypeScript for places CSS custom
properties cannot reach — charts, canvas, email, generated docs. `chartSeries`
gives a ready-ordered categorical sequence.

## Themes

`light` on white, `dark` on near-black ink. Both are
first-class — every component is styled for each.

```tsx
<InsightureProvider theme={theme} onThemeChange={setTheme}>   // controlled
<InsightureProvider defaultTheme="dark">                       // uncontrolled

const { theme, toggleTheme } = useInsightureTheme();           // inside the tree
```

## Components

| Group        | Components                                              |
| ------------ | ------------------------------------------------------- |
| Foundations  | `InsightureProvider`, `Stack`, `Divider`                 |
| Typography   | `Heading`, `Text`, `Link`                                |
| Actions      | `Button`, `IconButton`                                   |
| Data display | `Badge`, `Tag`, `Card` (+`Header`/`Body`/`Footer`), `Avatar` |
| Feedback     | `Alert`, `Spinner`, `Progress`                           |
| Forms        | `Input`, `Textarea`, `Select`, `Checkbox`, `Radio`, `RadioGroup`, `Switch` |
| Navigation   | `Tabs`, `Tooltip`, `Modal`                               |

Conventions across the set:

- **Tone vs colour.** `Badge`/`Alert`/`Progress` take a semantic `tone`
  (`success`, `danger`, …). `Tag` takes a `color` named after the palette
  (`coral`, `amber`, `yellow`, `azure`, `green`, `neutral`) because tags are
  categorical, not status.
- **Form controls own their labels.** Pass `label`, `hint` and `error` to the
  control; `htmlFor`, `aria-describedby` and `aria-invalid` are wired for you.
  Setting `error` also flips the field into the invalid state.
- **Controlled and uncontrolled.** `Tabs`, `RadioGroup` and `InsightureProvider`
  accept `value`/`defaultValue` with an `on*Change` callback.
- **Accent restraint.** Coral is the accent — one `Button variant="primary"`
  per view. `variant="emphasis"` (near-black) is for the single strongest action
  on a page. Reach for neutrals first; colour is the exception, not the default.

## Styling your own layout

Compose with `Stack` (flex wrapper over the space scale) and reach for the
custom properties directly in your own CSS:

```css
.dashboard {
  display: grid;
  gap: var(--ins-space-lg);
  padding: var(--ins-space-xl);
  background: var(--ins-bg-surface-sunken);
  border-radius: var(--ins-radius-lg);
}
```

Do not hardcode hex values in product code — every colour you need has a token.

## Layout of the repo

```
src/
  index.ts                 package entry (also imports the stylesheet)
  tokens.ts                TS mirror of the token values
  styles/                  font, primitives, semantic, base, stylesheet barrel
  components/<Name>/       one .tsx + one .css per component
docs/                      per-component docs (also drive the design-system sync)
docs/assets/               the README images, rendered from the real bundle
preview/                   local showcase app, not published
scripts/fetch-fonts.mjs    refreshes the self-hosted Inter subset
.design-sync/              inputs for the claude.ai/design sync
```

Adding a component: create `src/components/<Name>/`, add its stylesheet to
`src/styles/index.css`, and export it from `src/index.ts`.
