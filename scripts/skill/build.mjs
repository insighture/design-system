/**
 * Bundle the brand kit for AI assistants into skills/insighture-design-system/
 * and zip it to dist/ for upload (claude.ai, Custom GPTs, Gems, ...).
 *
 *   npm run skill
 *
 * SKILL.md and scripts/check_brand.py are hand-written. Everything else is
 * generated: assets/ and references/ are copied from the repo, palette.json
 * comes from the tokens, and AGENTS.md (the provider-neutral copy for Codex,
 * Cursor, Copilot, Gemini and friends) is SKILL.md minus its Claude-only
 * parts. Rebuild after changing SKILL.md, the logo, templates or tokens (run
 * `npm run templates` first if the templates changed).
 */
import { execFileSync } from 'node:child_process';
import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const name = 'insighture-design-system';
const skillDir = path.join(root, 'skills', name);

const copies = {
  'assets/logo/insighture-logo-black.svg': 'brand/logo/insighture-logo-black.svg',
  'assets/logo/insighture-logo-white.svg': 'brand/logo/insighture-logo-white.svg',
  'assets/logo/insighture-logo-white-mono.svg': 'brand/logo/insighture-logo-white-mono.svg',
  'assets/logo/insighture-logo-black-mono.svg': 'brand/logo/insighture-logo-black-mono.svg',
  'assets/logo/logo-black.png': 'templates/assets/logo-black.png',
  'assets/logo/logo-white.png': 'templates/assets/logo-white.png',
  'assets/logo/logo-white-mono.png': 'templates/assets/logo-white-mono.png',
  'assets/templates/Insighture.potx': 'templates/powerpoint/Insighture.potx',
  'assets/templates/Insighture-report.dotx': 'templates/word/Insighture-report.dotx',
  'assets/templates/Insighture-letterhead.dotx': 'templates/word/Insighture-letterhead.dotx',
  'assets/templates/newsletter.html': 'templates/email/newsletter.html',
};

for (const sub of ['assets', 'references']) {
  await fs.rm(path.join(skillDir, sub), { recursive: true, force: true });
}
for (const [to, from] of Object.entries(copies)) {
  await fs.mkdir(path.dirname(path.join(skillDir, to)), { recursive: true });
  await fs.copyFile(path.join(root, from), path.join(skillDir, to));
}

const tokens = await Promise.all(
  ['src/styles/tokens.css', 'src/styles/semantic.css'].map((f) => fs.readFile(path.join(root, f), 'utf8')),
);
await fs.mkdir(path.join(skillDir, 'references'), { recursive: true });
await fs.writeFile(path.join(skillDir, 'references/tokens.css'), tokens.join('\n'));

// Every hex in the tokens is allowed, named by the first token that defines
// it; the rest (gradient stops) are named after the token they appear in.
const colours = {};
for (const pass of ['define', 'other']) {
  for (const line of tokens[0].split('\n')) {
    const token = line.match(/--ins-([\w-]+)\s*:\s*(#?)/);
    if (pass === 'define' ? !token?.[2] : !token) continue;
    for (const [, hex] of line.matchAll(/#([0-9a-f]{6})\b/gi)) colours[hex.toUpperCase()] ??= token[1];
  }
}
colours.FFFFFF ??= 'pure white (print)';
const logoHashes = await Promise.all(
  Object.keys(copies)
    .filter((f) => f.startsWith('assets/logo/'))
    .map(async (f) => crypto.createHash('sha256').update(await fs.readFile(path.join(skillDir, f))).digest('hex')),
);
await fs.writeFile(
  path.join(skillDir, 'references/palette.json'),
  JSON.stringify({ colours, logoHashes }, null, 2) + '\n',
);

const skill = await fs.readFile(path.join(skillDir, 'SKILL.md'), 'utf8');
const agents = skill
  .replace(/^---\n[\s\S]*?\n---\n+/, '')
  .replace(/<!-- claude-only -->[\s\S]*?<!-- \/claude-only -->\n/g, '');
await fs.writeFile(
  path.join(skillDir, 'AGENTS.md'),
  `<!-- Generated from SKILL.md by \`npm run skill\` in github.com/insighture/design-system. Do not edit. -->
<!-- Instructions for AI assistants and coding agents: apply these rules to anything visual you make for Insighture. -->

${agents}`,
);

const zip = path.join(root, 'dist', `${name}.zip`);
await fs.mkdir(path.dirname(zip), { recursive: true });
await fs.rm(zip, { force: true });
execFileSync('zip', ['-rqX', zip, name, '-x', '*.DS_Store', '*__pycache__*'], { cwd: path.join(root, 'skills') });

console.log(path.relative(root, skillDir));
console.log(path.relative(root, zip));
