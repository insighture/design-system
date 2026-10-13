/**
 * Refresh the self-hosted webfonts in src/styles/fonts/.
 *
 *   node scripts/fetch-fonts.mjs
 *
 * Pulls the latin subsets of the two brand families from Google Fonts:
 *   - DM Sans (variable, wght 100–1000, roman + italic) — the whole system.
 *   - DM Serif Display (400, roman + italic) — the emphasis face, used only
 *     for the italic accent words inside headlines.
 * fonts.css is hand-maintained; if the file names below change, update it.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(here, '..', 'src', 'styles', 'fonts');

// The wght RANGE (not a single value) is what makes Google serve the variable
// font. Ask for one weight and you get a static 400 instance — every `medium`
// and `bold` in the system would then silently render at 400, because base.css
// sets `font-synthesis-weight: none`. DM Serif Display ships one weight only.
const CSS_URL =
  'https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=DM+Serif+Display:ital@0;1&display=swap';

// A modern UA is required — Google serves woff2 only to browsers it recognises.
const UA =
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

// Which @font-face block maps to which output file.
const TARGETS = [
  { family: 'DM Sans', style: 'normal', file: 'dm-sans-variable.woff2' },
  { family: 'DM Sans', style: 'italic', file: 'dm-sans-variable-italic.woff2' },
  { family: 'DM Serif Display', style: 'normal', file: 'dm-serif-display.woff2' },
  { family: 'DM Serif Display', style: 'italic', file: 'dm-serif-display-italic.woff2' },
];

const css = await fetch(CSS_URL, { headers: { 'User-Agent': UA } }).then((res) => {
  if (!res.ok) throw new Error(`Google Fonts responded ${res.status}`);
  return res.text();
});

// Blocks are emitted as "/* subset */ @font-face { … }". Latin is all we ship.
const blocks = [...css.matchAll(/\/\*\s*([\w-]+)\s*\*\/\s*(@font-face\s*\{[^}]*\})/g)]
  .filter(([, subset]) => subset === 'latin')
  .map(([, , face]) => ({
    family: /font-family:\s*'([^']+)'/.exec(face)?.[1],
    style: /font-style:\s*(\w+)/.exec(face)?.[1],
    url: /url\((https:[^)]+)\)/.exec(face)?.[1],
  }));

await fs.mkdir(outDir, { recursive: true });

for (const target of TARGETS) {
  const match = blocks.find(
    (block) => block.family === target.family && block.style === target.style,
  );
  if (!match?.url) {
    throw new Error(`No latin ${target.style} face for ${target.family}`);
  }
  const bytes = Buffer.from(
    await fetch(match.url).then((res) => res.arrayBuffer()),
  );
  await fs.writeFile(path.join(outDir, target.file), bytes);
  console.log(`${target.file}  ${(bytes.length / 1024).toFixed(1)} KB`);
}
