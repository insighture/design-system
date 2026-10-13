# design-sync notes — @insighture/design-system

Repo-specific gotchas for future syncs. Read this before re-running.

## Setup

- Build with `npm run build` (tsup). The converter entry is `./dist/index.js`;
  pass `--node-modules ./node_modules` (single-package repo, not a monorepo).
- `dist/index.css` is the whole stylesheet — tokens, semantic layer, base layer
  and every component rule are bundled into it, so `cfg.cssEntry` points there.
  **There is no separate `tokens/` directory in the output**; the ~226 custom
  properties live inside `_ds_bundle.css`, which `styles.css` `@import`s. That is
  correct, not a miss — don't go hunting for a tokens dir.
- `cfg.provider` is `InsightureProvider`. It is mandatory: it sets
  `data-ins-theme`, which is the selector every semantic token is defined under.
  Without it previews render completely unstyled, not merely off-brand.
- Playwright: chromium build **1234** is in `~/.cache/ms-playwright`, matching
  **playwright 1.62.1** (installed in `.ds-sync/`). No browser download needed.
  If a future playwright pins a different chromium, install the version whose
  `browsers.json` names a cached build rather than downloading ~200MB.

## Fixed during the first sync (2026-08-14) — don't reintroduce

- **`:indeterminate` must be scoped to checkboxes.** Per spec a radio matches
  `:indeterminate` whenever *nothing in its group is checked*, so an unscoped
  `.ins-choice__input:indeterminate` rule painted every empty radio group as if
  all options were half-selected. The selector is now
  `.ins-choice__input--checkbox:indeterminate`.
- **DM Sans must be fetched as a weight RANGE.** `scripts/fetch-fonts.mjs`
  asks Google for `wght@100..1000`. Requesting a single weight returns a *static* 400
  file; combined with `font-synthesis-weight: none` in `base.css`, every
  `medium`/`semibold`/`bold` in the system would then silently render at 400.
  Verified by measuring DOM span widths at 300–800; they must all differ.
  (Canvas `measureText` is NOT a valid check: it reported 400 = 500 and
  600 = 700 for the same correctly loaded variable font.)
- **Link tones must stay distinguishable.** `tone="default"` and `tone="accent"`
  both resolved to orange, so the variant axis didn't vary. Prose links are now
  ink + underline (`--ins-text-link: --ins-neutral-900`) warming to orange on
  hover; `tone="accent"` stays orange.
- **Modal needs a sized page behind it.** It renders via `position: fixed`, so
  the card root measured 0px and tripped `[RENDER_THIN]`. Its preview wraps the
  dialog in a `min-height: 380px` relative container. Keep that wrapper.
- **Tooltip got a `defaultOpen` prop** so it can be previewed statically — a
  hover-only tooltip renders as an empty card. It is a real, useful prop
  (onboarding hints), not a preview-only hack.
- **12 components need `cardMode: "column"`** (`Card`, `CardBody`, `CardFooter`,
  `CardHeader`, `Alert`, `Switch`, `Textarea`, `Divider`, `Stack`, `Tabs`,
  `Heading`, `Text`) — their stories are wider than a grid cell. `Modal` uses
  `cardMode: "single"`; `Tooltip` and `InsightureProvider` use `column`.

## Known render warns

None. The final validate run is fully clean: 28/28 render, 0 bad, 0 thin,
0 variants-identical, 0 floor cards. **Any warn on a future run is new** — look
at it rather than assuming it is pre-existing.

One thing that WILL warn if changed carelessly: `Badge`'s `Tones` story passes
`dot` on every cell. Without the dot the eight tones render as eight identical
neutral chips and trip `variantsIdentical` — that is correct behaviour, not a
bug, because the dot is the only tone signal.

## Re-sync risks

- **`docs/` drives both grouping and `.prompt.md`.** Each `docs/<Name>.md` has a
  `category:` frontmatter key that sets the component's group. Adding a component
  without a matching doc drops it into the default group and gives it a
  synthesized prompt. Add the doc at the same time as the component.
- **`.design-sync/conventions.md` is prepended to the uploaded README** and is
  read by the design agent. It enumerates real token names, which were verified
  against `_ds_bundle.css` at sync time. If tokens are renamed, re-run that
  validation — a conventions file naming tokens that no longer exist is worse
  than none, because the agent will trust it and emit unstyled output.
- **Fonts are network-fetched.** `scripts/fetch-fonts.mjs` pulls from Google
  Fonts at author time; the woff2 files are committed, so a sync does not need
  network. Re-running the script requires it.
- **Palette rebrand (2026-10-13).** Endpoint: white `#FCFCFD` / black `#15181A`
  backbone, dark teal `#08242B` ground (the dark theme and `--ins-bg-inverse`),
  crimson rose `#EE4065` accent, and alts teal/orange/yellow/indigo.
  Same day, the type was aligned with insighture.com: DM Sans (semibold
  headings) plus DM Serif Display italic via `<em>` in `Heading`, pill
  buttons, 18px cards, and `--ins-gradient-rose` hero bands. The Inter woff2
  files in `src/styles/fonts/` are unused leftovers and can be deleted. `--ins-azure-*`, `--ins-ink-*`, `--ins-orange-amber`
  and the coral/amber/azure/green `Tag` colours were removed. The system is
  now medium-agnostic (see `GUIDELINES.md`), and conventions.md carries the
  deck/document guidance. Several decisions look like omissions but are
  deliberate — do NOT "restore" them:
  - `Badge` surfaces and labels are neutral; `tone` colours the dot only.
    `outline` and `solid` are the opt-in louder tiers.
  - `Tag` chips are neutral; the category colour is in the `swatch` only.
  - `Alert` has no coloured left rule and no tinted default surface.
  - `Avatar` fallbacks are neutral, not accent-tinted.
  - **The button hierarchy is theme-dependent and intentional.** Light:
    `primary` = black, `emphasis` = rose. Dark (teal): `primary` = rose,
    `emphasis` = white. It runs through dedicated `--ins-button-primary-*` /
    `--ins-button-emphasis-*` tokens rather than `--ins-accent-*`, precisely so
    the dark-mode swap does not drag the rest of the accent system with it. If you
    ever "simplify" these back onto the accent tokens you will break that.
  - There is still no `font` prop on `Heading`. The serif is reachable only
    through `<em>` inside a heading, on purpose: it's an emphasis device, not
    a heading style. Heading tracking is driven by `size` alone.
- **`preview/` (the local Vite showcase) is not part of the sync** and can drift
  from `.design-sync/previews/`. The synced cards come only from the latter.
