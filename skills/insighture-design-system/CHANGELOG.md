# Changelog: insighture-design-system

The Insighture brand skill, governed under the `insighture/skills` contract (`CONTRIBUTING.md` there).
From 2.0.0 this repository owns the skill, its metadata and this changelog; releases are tagged
`insighture-design-system@<version>` here and registered in `insighture/skills` `externals.json`.
Versions 1.0.0 and 1.1.0 were cut in `insighture/skills` while it vendored this folder; their entries
are carried over unchanged. Format follows Keep a Changelog with mandatory **Behavioural impact** and
**Migration** sections.

## [2.0.0] - 2026-11-22

### Added
- Governance metadata in the frontmatter (`license`, `compatibility`, `metadata.version`, tier, owner,
  risk, status, review date, standards), previously injected by `insighture/skills` when vendoring.
- This changelog, previously kept in `insighture/skills`.
- A "Not for …" clause in `description`, naming `insighture-writing-style` (wording, tone, spelling)
  and `insighture-client-confidentiality` (whether a client may be named or shown).
- A `## Rules` section restating the existing hard rules (sections 2, 3, 6 and 8, and
  `GUIDELINES.md`) as MUST / MUST NOT statements. No new brand rules.
- Two checklist items: copy follows `insighture-writing-style`; no client named unless
  `insighture-client-confidentiality` allows it.

### Removed
- `AGENTS.md` from the skill folder. `npm run skill` now writes it to `dist/AGENTS.md`.
- `metadata.upstream`: the skill is no longer vendored, so there is no upstream pin.

### Behavioural impact
major — the trigger (`description`) and the MUST / MUST NOT contract changed. The brand itself
(palette, type, logo, templates, `scripts/check_brand.py`) is unchanged, so output that met 1.1.0
still meets 2.0.0; agents now also decline to treat wording or client-naming questions as brand
questions.

### Migration
Consumers pin `insighture-design-system@2.0.0` (Tracelet pack from this repository, folder `skills/`;
the Claude organisation library plugin built by `insighture/skills`). `insighture/skills` stops
vendoring this folder and registers it in `externals.json` instead. Tools that read `AGENTS.md` take
it from `dist/AGENTS.md` (built by `npm run skill`, attached to CI runs).

## [1.1.0] - 2026-11-14

### Changed
- Synced to upstream commit `7ad33ef` (design-system PR #7, commit `b3975d4`: package the AI skill for
  Tracelet distribution).
- "Bundled files" now says how to reach the logo, templates and references for each way the skill
  arrives: as a folder (read from disk), through the Tracelet MCP Gateway (fetch with
  `read_skill_file`), or as text only (use the inline values and the inline logo).
- Upstream also added a generated `AGENTS.md` in that commit; it is not vendored
  (`drop-generated-agents-md`), as before.

### Behavioural impact
minor — additive guidance only. Brand rules, palette, fonts, logo, templates and scripts are
unchanged. Agents now check how the skill reached them before relying on a bundled file, and clients
connected through the Tracelet MCP Gateway are told how to fetch those files.

### Migration
None.

## [1.0.0] - 2026-10-22

### Added
- First vendored copy of the brand kit at upstream commit `cf6e06f` (brand version 2: DM Sans, crimson
  rose, dark teal; logo SVG/PNG, Office templates, `references/tokens.css`, `references/palette.json`,
  `scripts/check_brand.py`).
- Governance metadata injected into the frontmatter (owner, risk, status, review date, upstream pin).

### Removed
- Upstream `AGENTS.md` (this repository generates its own provider-neutral copy in `dist/`).

### Behavioural impact
major — first governed version. Agents that previously fetched the kit from the design-system repo
`main` branch now get a pinned, reviewed copy; upstream changes arrive only through a reviewed sync PR.

### Migration
None for consumers. Maintainers: update the pin with `node scripts/sync-upstream.mjs --update insighture-design-system`.
