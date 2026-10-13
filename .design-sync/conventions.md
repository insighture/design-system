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
`defaultTheme="dark"` (the brand dark teal ground). Use `theme` + `onThemeChange` for a
controlled toggle. `Modal` renders in place rather than through a portal, so keep
it inside the provider.

### Style with tokens, never hex

Every colour, space, radius and shadow is a CSS custom property. Write your own
layout CSS against these. Don't hardcode values, and don't invent token names.
Prefer the semantic tokens; reach for the `--ins-brand-*` and ramp primitives
only for decks, covers, charts and illustration.

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
| Accent (rose) | `--ins-accent-bg`, `--ins-accent-bg-hover`, `--ins-accent-bg-subtle`, `--ins-accent-border`, `--ins-accent-text`, `--ins-accent-on-accent` |
| Emphasis (black) | `--ins-emphasis-solid`, `--ins-emphasis-solid-hover`, `--ins-emphasis-on-solid` |
| Support (teal) | `--ins-support-bg`, `--ins-support-border`, `--ins-support-text`, `--ins-support-solid` |
| Status | `--ins-{info,success,warning,danger,highlight}-{bg,border,text,solid}` |
| Space | `--ins-space-{3xs,2xs,xs,sm,md,lg,xl,2xl,3xl,4xl}` |
| Radius | `--ins-radius-{sm,md,lg,xl,pill}` |
| Type | `--ins-font-sans`, `--ins-font-serif`, `--ins-font-mono`, `--ins-font-size-{2xs…5xl}`, `--ins-font-weight-{regular,medium,semibold,bold}` |
| Brand / alts | `--ins-brand-{white,black,deep-teal,rose,teal,orange,yellow,indigo}`, ramps `--ins-{rose,teal,orange,yellow,indigo,deep,neutral}-{50…900}`, `--ins-gradient-brand` |
| Elevation | `--ins-shadow-{xs,sm,md,lg}`, `--ins-shadow-card`, `--ins-focus-ring` |

There are no utility classes. Style via component props first, then your own CSS
using the tokens above. Component internals use `ins-` prefixed classes
(`.ins-button`, `.ins-card`) — read them, never author them.

### The palette — four main colours, four alts

| | Name | Hex | Role |
| --- | --- | --- | --- |
| Main | White | `#FCFCFD` | Pages, slides, surfaces |
| Main | Black | `#15181A` | Text, headings, the strongest action on light |
| Main | Dark teal | `#08242B` | **Backgrounds**: dark theme, covers, title slides, hero bands |
| Main | Crimson rose | `#EE4065` | **The accent**: one key element per view |
| Alt | Teal | `#0FA2BF` | Support / info, second data series |
| Alt | Orange | `#FF8102` | Categorical, illustration |
| Alt | Yellow | `#FAB400` | Warning, highlight, categorical |
| Alt | Indigo | `#4F46E5` | Categorical, data |

Green `#17A06A` (success) and red `#D93A2B` (danger) are functional only.

### Colour restraint is the point of this system

- **Neutrals carry the content.** A well-built page, slide or screen is mostly
  white and black (`--ins-neutral-*`). Dark teal is the *ground* for dark
  surfaces. It is never small text or a thin line on white.
- **One rose element per view**: the key number, the CTA, the highlighted
  word. Rose also carries focus, selection and the active tab.
- **Buttons are pills**, and so are tags and toggles. Cards are 18px.
- **The button hierarchy flips with the theme, on purpose.** `variant="primary"`
  is black on light and rose on dark teal; `variant="emphasis"` is rose on light
  and white on dark teal. Both come from `--ins-button-*` tokens, so you never
  hand-pick a colour.
- **Alt colours distinguish, they never accent.** Use them for charts, `Tag`
  swatches (`rose`, `teal`, `orange`, `yellow`, `indigo`) and illustration.
  Never use them as surfaces or competing highlights.
- **Status stays small.** `Badge` surfaces and labels are neutral, and `tone`
  colours the `dot` alone. `Alert` is a neutral card with a coloured icon.
  `variant="tinted"` is the loud exception, at most one per view.
- **Small rose text uses `--ins-text-accent`** (`#B11032` on light), never the
  raw `#EE4065`, which is only 3.8:1 on white.

### Not just apps: decks, documents and pages

This system is medium-agnostic. When you build a **slide deck**, **document**,
**landing page**, **one-pager** or **social card** rather than a product screen:

- **Hero bands and title slides:** a `--ins-gradient-rose` full-bleed ground,
  white semibold display title with one or two words in `<em>` (white serif
  italic: give the Heading `tone="inverse"`), and a white pill CTA. This is
  insighture.com's signature look.
- **Section and closing slides, testimonials, dark bands:** dark teal
  (`--ins-bg-inverse` on light, or `defaultTheme="dark"`), white title, and a
  rose serif italic word. `--ins-gradient-brand` is decoration only (thin
  strips) and never sits behind text.
- **Content pages and slides:** white ground, black semibold title with an
  optional rose `<em>` phrase, an uppercase
  eyebrow (`Text size="xs" caps`), body in `--ins-text-secondary`, and lots of
  empty space (≥ 40% of a slide).
- **Big numbers:** set the figure in rose semibold at display size, with a neutral
  label underneath.
- **Charts:** series order is rose → dark teal → teal → yellow → indigo →
  orange. To spotlight one series, make it rose and the rest
  `--ins-neutral-400`.
- **Slide type (16:9):** title 36pt, body 18pt. **Document type:** H1 20pt,
  body 10.5pt. DM Sans throughout, plus DM Serif Display italic for `<em>`.
- **Cards:** `--ins-radius-lg` (18px), white, soft shadow, an alt-colour icon
  tile, and a "Learn more ›" link. Each card in a set may take its own alt
  colour.

### Typography

**DM Sans** is the one family for headings, UI and body. **DM Serif Display
italic** is the emphasis face: wrap one or two words of a `Heading` in `<em>`
("We own the problem, not just `<em>`the solution.`</em>`") and they render
in serif italic rose. Use one emphasis run per heading, at `size="md"` and
up. Never use it in body text, buttons or labels, and don't add other faces.

`Heading` is semibold (600), and its tracking tightens as `size` grows (down to
-0.025em at `display`). Pick the `size`; the tracking follows. `level`
(semantics) and `size` (appearance) are separate props — never skip a heading
level to get a smaller heading.

`Text` weights are `regular` / `medium` / `semibold` / `bold`. Buttons are
medium, headings semibold; keep `bold` for key figures. `caps` gives the uppercase
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
        <Heading level={2} size="xs">Last 24 hours</Heading>
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
