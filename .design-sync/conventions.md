## How to build with the Insighture design system

### Wrap everything in the provider

`InsightureProvider` sets the `data-ins-theme` attribute that every token in this
system is defined under. **Without it nothing is styled** — components render as
unstyled boxes with browser-default text, because `--ins-*` resolves to nothing.
Mount exactly one, at the root:

```jsx
<InsightureProvider defaultTheme="light">
  <YourScreen />
</InsightureProvider>
```

Both themes are first-class: `defaultTheme="light"` (white ground) and
`defaultTheme="dark"` (near-black ground). Use `theme` + `onThemeChange` for a
controlled toggle. `Modal` renders in place rather than through a portal, so keep
it inside the provider.

### Style with tokens, never hex

Every colour, space, radius and shadow is a CSS custom property. Write your own
layout CSS against these — do not hardcode values, and do not invent token names.

```css
.dashboard {
  display: grid;
  gap: var(--ins-space-lg);
  padding: var(--ins-space-xl);
  background: var(--ins-bg-canvas);
  color: var(--ins-text-primary);
  border-radius: var(--ins-radius-lg);
}
```

The families you will actually use:

| Purpose | Tokens |
| --- | --- |
| Surfaces | `--ins-bg-canvas`, `--ins-bg-surface`, `--ins-bg-surface-sunken`, `--ins-bg-subtle`, `--ins-bg-muted`, `--ins-bg-inverse` |
| Text | `--ins-text-primary`, `--ins-text-secondary`, `--ins-text-tertiary`, `--ins-text-disabled`, `--ins-text-inverse`, `--ins-text-accent`, `--ins-text-link` |
| Borders | `--ins-border-subtle`, `--ins-border-default`, `--ins-border-strong` |
| Accent (coral) | `--ins-accent-bg`, `--ins-accent-bg-hover`, `--ins-accent-bg-subtle`, `--ins-accent-border`, `--ins-accent-text`, `--ins-accent-on-accent` |
| Emphasis (ink) | `--ins-emphasis-solid`, `--ins-emphasis-solid-hover`, `--ins-emphasis-on-solid` |
| Support (azure) | `--ins-support-bg`, `--ins-support-border`, `--ins-support-text`, `--ins-support-solid` |
| Status | `--ins-{info,success,warning,danger,highlight}-{bg,border,text,solid}` |
| Space | `--ins-space-{3xs,2xs,xs,sm,md,lg,xl,2xl,3xl,4xl}` |
| Radius | `--ins-radius-{sm,md,lg,xl,pill}` |
| Type | `--ins-font-sans`, `--ins-font-serif`, `--ins-font-size-{2xs…5xl}`, `--ins-font-weight-{regular,medium,bold}` |
| Elevation | `--ins-shadow-{xs,sm,md,lg}`, `--ins-shadow-card`, `--ins-focus-ring` |

There are no utility classes. Style via component props first, then your own CSS
using the tokens above. Component internals use `ins-` prefixed classes
(`.ins-button`, `.ins-card`) — read them, never author them.

### Colour restraint is the point of this system

This palette is deliberately weighted and it is easy to ruin by adding colour:

- **Neutrals carry the screen.** Surfaces, rules and text all come from the
  neutral ramp. A well-built screen is mostly white (or near-black) and ink.
- **The button hierarchy flips with the theme, on purpose.** `variant="primary"`
  is ink on light and coral on dark; `variant="emphasis"` is coral on light and
  azure on dark. Both come from `--ins-button-*` tokens, so you never hand-pick
  a colour — just choose the variant and let the theme resolve it. Primary is
  one per view; emphasis is for the single most important action on a page.
- Orange still carries focus, selection and the active tab in both themes.
- **Blue is rationed.** It appears as `info` status, the `support` role, one
  `Tag color="azure"` slot and one chart series. Never a surface, never a
  general-purpose accent.
- **Alerts are quiet by default** — a neutral card whose only colour is the
  status icon. `variant="tinted"` is the loud exception; at most one per view.
- **Pills carry no colour but their bullet.** `Badge` surfaces *and labels* are
  always neutral; `tone` colours the `dot` alone, so always pass `dot` when the
  status matters. `Tag` chips are neutral too — the category colour lives in the
  `swatch`. Never build a coloured or coloured-text pill by hand.

When in doubt, reach for a neutral. Colour should mark the one thing that matters.

### Typography

**Inter, and only Inter** — one variable family for headings, UI and body. There
is no second face and no font-family choice to make; do not introduce one.

`Heading` is always bold, and its tracking tightens as `size` grows (down to
-0.035em at `display`). Pick the `size`; the tracking follows. `level`
(semantics) and `size` (appearance) are separate props — never skip a heading
level to get a smaller heading.

`Text` weights are `regular` / `medium` / `semibold` / `bold`. Reach for
`semibold` when bold is too heavy for dense UI. `caps` gives the uppercase
micro-label used for eyebrows and table headers.

### A representative screen

```jsx
<InsightureProvider defaultTheme="light">
  <Stack gap="lg" style={{ padding: 'var(--ins-space-xl)' }}>
    <Stack direction="row" justify="between" align="center" gap="md">
      <Stack gap="3xs">
        <Text size="xs" caps tone="tertiary">Workspace</Text>
        <Heading level={1} size="lg">Pipeline health</Heading>
      </Stack>
      <Button variant="primary">New report</Button>
    </Stack>

    <Card>
      <CardHeader>
        <Heading level={2} size="xs" font="sans">Last 24 hours</Heading>
        <Badge tone="success" dot>Healthy</Badge>
      </CardHeader>
      <CardBody>
        <Text size="sm" tone="secondary">
          All 14 scheduled jobs completed.
        </Text>
        <Progress value={92} tone="success" label="Success rate" showValue />
      </CardBody>
      <CardFooter>
        <Button variant="ghost" size="sm">Dismiss</Button>
        <Button size="sm">View report</Button>
      </CardFooter>
    </Card>
  </Stack>
</InsightureProvider>
```

### Where the truth lives

Read `_ds/<folder>/styles.css` and the `_ds_bundle.css` it imports for the real
token definitions and component classes, and each component's `.prompt.md` for
its API, variants and usage rules. Form controls (`Input`, `Textarea`, `Select`,
`Checkbox`, `Radio`, `Switch`) own their own `label`, `hint` and `error` props —
pass those rather than rendering your own labels, and the accessibility wiring is
handled for you.
