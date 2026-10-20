/**
 * Check the skill bundle against Tracelet's upload rules, so the zip in dist/
 * (and GitHub's "Download ZIP", which honours the same .gitattributes) is
 * always one Tracelet's Engineering Standards → Skills "Upload zip" accepts.
 * Tracelet refuses the whole zip on one bad file, it doesn't skip it. Mirrors
 * api/internal/skillbundle in the Tracelet repo (limits, allowed file types,
 * frontmatter); update both together.
 *
 *   npm run skill:check            # check the bundle + dist zip
 *
 * The bundle is every tracked or new file not marked export-ignore in
 * .gitattributes. build.mjs runs this before and after zipping, so
 * `npm run skill` fails instead of writing a zip Tracelet would refuse.
 */
import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const LIMITS = {
  maxZipBytes: 25 << 20,
  maxFiles: 100,
  maxFileBytes: 10 << 20,
  maxTotalBytes: 100 << 20,
  maxDepth: 8,
  maxPathBytes: 255,
};

const TEXT_EXTS = new Set([
  '.md', '.mdc', '.txt', '.csv', '.json', '.yaml', '.yml', '.toml', '.xml', '.html', '.htm',
  '.css', '.svg', '.sh', '.bash', '.ps1', '.py', '.js', '.mjs', '.cjs', '.ts', '.tsx', '.jsx',
  '.go', '.rb', '.rs', '.java', '.kt', '.swift', '.c', '.h', '.cpp', '.cs', '.sql', '.tf',
  '.ini', '.cfg', '.j2', '.tmpl',
]);
const OFFICE_EXTS = new Set(['.docx', '.dotx', '.pptx', '.potx', '.xlsx', '.xltx']);
// Magic bytes for the raster/PDF/font types Tracelet sniffs.
const MAGIC = {
  '.png': [[0x89, 0x50, 0x4e, 0x47]],
  '.jpg': [[0xff, 0xd8, 0xff]],
  '.jpeg': [[0xff, 0xd8, 0xff]],
  '.gif': [[0x47, 0x49, 0x46, 0x38]],
  '.webp': [[0x52, 0x49, 0x46, 0x46]],
  '.pdf': [[0x25, 0x50, 0x44, 0x46]],
  '.woff': [[0x77, 0x4f, 0x46, 0x46]],
  '.woff2': [[0x77, 0x4f, 0x46, 0x32]],
  '.ttf': [[0x00, 0x01, 0x00, 0x00], [0x74, 0x72, 0x75, 0x65]],
  '.otf': [[0x4f, 0x54, 0x54, 0x4f]],
};
const EXTENSIONLESS_TEXT = new Set(['LICENSE', 'LICENCE', 'NOTICE', 'README', 'Makefile', 'Dockerfile', 'CODEOWNERS', 'AUTHORS']);
// Dropped silently by Tracelet, so harmless — but never part of the skill.
const NOISE = new Set(['.DS_Store', 'Thumbs.db', 'desktop.ini', '.gitignore', '.gitattributes', '.gitkeep']);

/** Files that ship in the skill: tracked or new, not ignored, not export-ignore. */
export function bundleFiles(root) {
  const git = (args, input) => execFileSync('git', args, { cwd: root, encoding: 'utf8', input, maxBuffer: 16 << 20 });
  const all = git(['ls-files', '--cached', '--others', '--exclude-standard', '-z']).split('\0').filter(Boolean);
  const present = all.filter((f) => existsSync(path.join(root, f))); // skip files deleted in the working tree
  const attrs = git(['check-attr', '-z', '--stdin', 'export-ignore'], present.join('\0') + '\0').split('\0');
  const ignored = new Set();
  for (let i = 0; i + 2 < attrs.length; i += 3) if (attrs[i + 2] === 'set') ignored.add(attrs[i]);
  return [...new Set(present.filter((f) => !ignored.has(f) && !f.includes('__pycache__/')))].sort();
}

function frontmatter(text) {
  const m = text.replace(/^﻿/, '').match(/^---\r?\n([\s\S]*?)\r?\n---\s*\r?\n([\s\S]*)$/);
  if (!m) return null;
  const field = (k) => {
    const line = m[1].match(new RegExp(`^${k}:\\s*(.*)$`, 'm'));
    return line ? line[1].trim().replace(/^(["'])([\s\S]*)\1$/, '$2') : '';
  };
  return { name: field('name'), description: field('description'), body: m[2] };
}

const slugify = (s) => s.toLowerCase().trim().replace(/[^a-z0-9_-]+/g, '-').replace(/^[-_]+|[-_]+$/g, '').slice(0, 64);

/** Returns a list of problems with `paths` under `root` (empty = Tracelet accepts them). */
export async function checkFiles(root, paths, expectedSlug) {
  const errors = [];
  const files = [];
  for (const p of paths) {
    if (NOISE.has(path.posix.basename(p))) continue;
    files.push({ path: p, symlink: (await fs.lstat(path.join(root, p))).isSymbolicLink() });
  }
  if (files.length > LIMITS.maxFiles) errors.push(`${files.length} files; Tracelet's limit is ${LIMITS.maxFiles}`);

  const seen = new Map();
  let total = 0;
  for (const f of files) {
    const p = f.path;
    const base = path.posix.basename(p);
    const ext = path.posix.extname(base).toLowerCase();
    if (f.symlink) { errors.push(`${p}: symbolic links are refused`); continue; }
    if (base.startsWith('.')) { errors.push(`${p}: hidden files are refused`); continue; }
    if (Buffer.byteLength(p) > LIMITS.maxPathBytes) errors.push(`${p}: path longer than ${LIMITS.maxPathBytes} bytes`);
    if (p.split('/').length > LIMITS.maxDepth) errors.push(`${p}: nested deeper than ${LIMITS.maxDepth} levels`);
    if (/[\\:]/.test(p)) errors.push(`${p}: backslashes and colons are refused in paths`);
    const lower = p.toLowerCase();
    if (seen.has(lower)) errors.push(`${p}: differs only in case from ${seen.get(lower)}`);
    seen.set(lower, p);

    const data = await fs.readFile(path.join(root, p));
    total += data.length;
    if (data.length > LIMITS.maxFileBytes) errors.push(`${p}: ${data.length} bytes; per-file limit is ${LIMITS.maxFileBytes}`);

    if (TEXT_EXTS.has(ext) || (ext === '' && EXTENSIONLESS_TEXT.has(base))) {
      const s = data.toString('utf8');
      if (data.includes(0) || Buffer.from(s, 'utf8').compare(data) !== 0) errors.push(`${p}: not UTF-8 text`);
    } else if (OFFICE_EXTS.has(ext)) {
      let entries;
      try {
        entries = execFileSync('unzip', ['-Z1', path.join(root, p)], { encoding: 'utf8' }).split('\n').map((e) => e.toLowerCase());
      } catch {
        errors.push(`${p}: not an Office document`);
        continue;
      }
      if (!entries.includes('[content_types].xml')) errors.push(`${p}: not an Office document`);
      if (entries.some((e) => path.posix.basename(e) === 'vbaproject.bin')) errors.push(`${p}: contains macros`);
    } else if (MAGIC[ext]) {
      if (!MAGIC[ext].some((sig) => sig.every((b, i) => data[i] === b))) errors.push(`${p}: content does not match its ${ext} extension`);
    } else {
      errors.push(`${p}: file type "${ext || base}" is refused by Tracelet`);
    }
  }
  if (total > LIMITS.maxTotalBytes) errors.push(`files total ${total} bytes; limit is ${LIMITS.maxTotalBytes}`);

  if (!paths.includes('SKILL.md')) {
    errors.push('SKILL.md missing at the skill root');
    return errors;
  }
  const skill = await fs.readFile(path.join(root, 'SKILL.md'), 'utf8');
  const fm = frontmatter(skill);
  if (!fm) errors.push('SKILL.md needs YAML frontmatter (--- name/description ---)');
  else {
    if (!fm.name) errors.push('SKILL.md frontmatter has no name (Tracelet derives the slug from it)');
    else if (expectedSlug && slugify(fm.name) !== expectedSlug)
      errors.push(`SKILL.md name slugifies to "${slugify(fm.name)}", expected "${expectedSlug}" (a different slug makes a new standard instead of a new version)`);
    if (!fm.description) errors.push('SKILL.md frontmatter has no description');
    if (!fm.body.trim()) errors.push('SKILL.md has no content after the frontmatter');
    if (!/^#\s+\S/m.test(fm.body)) errors.push('SKILL.md body has no "# " heading (Tracelet uses it as the display name)');
  }
  return errors;
}

export async function checkZip(zipPath) {
  const { size } = await fs.stat(zipPath);
  return size > LIMITS.maxZipBytes ? [`${path.basename(zipPath)} is ${size} bytes; Tracelet's limit is ${LIMITS.maxZipBytes}`] : [];
}

export function report(label, errors) {
  if (errors.length === 0) return;
  console.error(`Tracelet would refuse ${label}:`);
  for (const e of errors) console.error(`  - ${e}`);
  process.exitCode = 1;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
  const name = 'insighture-design-system';
  const files = bundleFiles(root);
  report('the skill bundle', await checkFiles(root, files, name));
  const zip = path.join(root, 'dist', `${name}.zip`);
  try {
    report(`dist/${name}.zip`, await checkZip(zip));
  } catch {
    console.error(`dist/${name}.zip not found; run npm run skill`);
    process.exitCode = 1;
  }
  if (!process.exitCode) console.log(`${files.length} files: Tracelet-compatible`);
}
