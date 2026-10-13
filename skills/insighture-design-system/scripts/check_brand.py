#!/usr/bin/env python3
"""Check a file against the Insighture brand.

    python3 check_brand.py deck.pptx report.docx page.html [--json]

Supports .pptx/.potx, .docx/.dotx, .xlsx/.xltx, .html/.htm/.css/.svg and .pdf.
Checks colours against the palette, fonts against DM Sans / DM Serif Display
(Arial / Georgia fallbacks), that the real logo is used, and a few layout
heuristics (one rose element per slide, serif emphasis kept short, fonts
actually loaded on web pages).

Exit code: 0 = no errors (warnings allowed), 1 = errors found, 2 = bad input.
Standard library only, Python 3.8+. Reads ../references/palette.json, which
`npm run skill` generates from the design tokens.
"""
import hashlib
import json
import re
import sys
import zipfile
import zlib
from pathlib import Path

KIT = Path(__file__).resolve().parent.parent
ROSE = 'EE4065'
LOGO_DOT_PATH = 'M104.088 5.45233'
ALLOWED_FONT_PREFIXES = ('dmsans', 'dmserifdisplay', 'arial', 'georgia')
MONO_FONTS = ('uimonospace', 'sfmonoregular', 'sfmono', 'menlo', 'consolas', 'monaco', 'couriernew', 'monospace')
GENERIC_FONTS = ('inherit', 'initial', 'unset', 'revert', 'var(')


def load_palette():
    data = json.loads((KIT / 'references' / 'palette.json').read_text())
    return {h.upper(): n for h, n in data['colours'].items()}, set(data['logoHashes'])


PALETTE, LOGO_HASHES = load_palette()


class Report:
    def __init__(self, path):
        self.path = str(path)
        self.findings = []
        self._seen = {}
        self.bad_input = False

    def add(self, level, message, where=None):
        key = (level, message)
        if key in self._seen:
            f = self._seen[key]
            if where and where not in f['where']:
                f['where'].append(where)
            f['count'] += 1
            return
        f = {'level': level, 'message': message, 'where': [where] if where else [], 'count': 1}
        self._seen[key] = f
        self.findings.append(f)

    @property
    def errors(self):
        return sum(f['level'] == 'error' for f in self.findings)

    @property
    def warnings(self):
        return sum(f['level'] == 'warning' for f in self.findings)


# ---- colour ---------------------------------------------------------------

def hex_to_rgb(h):
    return tuple(int(h[i:i + 2], 16) for i in (0, 2, 4))


def nearest(h):
    r, g, b = hex_to_rgb(h)
    best = min(PALETTE, key=lambda p: sum((a - c) ** 2 for a, c in zip((r, g, b), hex_to_rgb(p))))
    return best, PALETTE[best]


def in_palette(h, tolerance=0):
    h = h.upper()
    if h in PALETTE:
        return True
    if tolerance:
        rgb = hex_to_rgb(h)
        return any(max(abs(a - c) for a, c in zip(rgb, hex_to_rgb(p))) <= tolerance for p in PALETTE)
    return False


def check_colour(report, h, where, level='error', tolerance=0):
    h = h.upper()
    if len(h) == 3:
        h = ''.join(c * 2 for c in h)
    if not in_palette(h, tolerance):
        near, name = nearest(h)
        report.add(level, f'colour #{h} is not in the Insighture palette (nearest: #{near} {name})', where)


# ---- fonts ----------------------------------------------------------------

def compact(name):
    return re.sub(r'[^a-z(]', '', name.lower())


def font_ok(name):
    c = compact(name)
    return not c or c.startswith(ALLOWED_FONT_PREFIXES) or c.startswith(MONO_FONTS) or c.startswith(GENERIC_FONTS)


def check_font(report, name, where):
    name = name.strip().strip('\'"')
    if name and not font_ok(name):
        report.add('error', f'font "{name}" is not a brand font (use DM Sans, DM Serif Display italic for emphasis; Arial/Georgia as fallbacks)', where)


# ---- Office (OOXML) -------------------------------------------------------

OOXML_COLOUR_PATTERNS = [
    re.compile(r'<a:srgbClr\s+val="([0-9A-Fa-f]{6})"'),
    re.compile(r'<a:sysClr\b[^>]*lastClr="([0-9A-Fa-f]{6})"'),
    re.compile(r'<w:color\b[^>]*w:val="([0-9A-Fa-f]{6})"'),
    re.compile(r'\bw:fill="([0-9A-Fa-f]{6})"'),
    re.compile(r'\bw:color="([0-9A-Fa-f]{6})"'),
    re.compile(r'<(?:\w+:)?(?:fgColor|bgColor|color)\b[^>]*\brgb="[0-9A-Fa-f]{2}([0-9A-Fa-f]{6})"'),
]
OOXML_FONT_PATTERNS = [
    re.compile(r'<a:latin\s+typeface="([^"+][^"]*)"'),
    re.compile(r'<w:rFonts\b[^>]*\bw:(?:ascii|hAnsi)="([^"]+)"'),
    re.compile(r'<(?:\w+:)?(?:name|rFont)\s+val="([^"]+)"'),
]
# Shadows are black at low alpha by design; they aren't brand colours.
OOXML_SHADOWS = re.compile(r'<a:effectStyleLst>.*?</a:effectStyleLst>|<a:(outer|inner|prst)Shdw\b.*?</a:\1Shdw>', re.S)
OOXML_PARTS = re.compile(r'^(ppt/(slides|slideLayouts|slideMasters|theme|notesMasters)/|word/(document|styles|header\d*|footer\d*|theme/)|xl/(styles|sharedStrings|theme/|worksheets/|drawings/|charts/)|ppt/charts/|word/charts/)')


def check_ooxml(report, path):
    try:
        z = zipfile.ZipFile(path)
    except zipfile.BadZipFile:
        report.add('error', 'not a valid Office file (zip)')
        return
    logo_found = False
    for info in z.infolist():
        name = info.filename
        if name.startswith(('ppt/media/', 'word/media/', 'xl/media/')):
            data = z.read(name)
            if hashlib.sha256(data).hexdigest() in LOGO_HASHES or (name.endswith('.svg') and LOGO_DOT_PATH.encode() in data):
                logo_found = True
            continue
        if not name.endswith('.xml') or not OOXML_PARTS.match(name):
            continue
        xml = OOXML_SHADOWS.sub('', z.read(name).decode('utf8', 'replace'))
        where = name
        m = re.match(r'ppt/slides/slide(\d+)\.xml', name)
        if m:
            where = f'slide {m.group(1)}'
        for pat in OOXML_COLOUR_PATTERNS:
            for h in pat.findall(xml):
                check_colour(report, h, where)
        for pat in OOXML_FONT_PATTERNS:
            for f in pat.findall(xml):
                check_font(report, f, where)
        if '<a:sysClr' in xml and '/theme/' in name:
            report.add('warning', 'theme uses system colours (an unmodified Office theme); apply the Insighture theme', where)
        if m:
            shapes = re.split(r'<p:(?:sp|cxnSp|graphicFrame)\b', xml)[1:]
            rose = sum(1 for s in shapes if f'VAL="{ROSE}"' in s.upper() or 'schemeClr val="accent1"' in s)
            if rose > 1:
                report.add('warning', f'{rose} shapes use rose; keep one rose moment per slide', where)
        check_serif_runs(report, xml, where)
    if not logo_found:
        report.add('warning', 'no Insighture logo found; use the supplied logo file (assets/logo/)')


RUN = re.compile(r'<(a|w):r>(.*?)</\1:r>', re.S)
TEXT = re.compile(r'<(?:a|w):t(?:\s[^>]*)?>([^<]*)</(?:a|w):t>')


def check_serif_runs(report, xml, where):
    for _, run in RUN.findall(xml):
        if 'DM Serif' not in run:
            continue
        text = ''.join(TEXT.findall(run)).strip()
        if len(text.split()) > 4:
            report.add('warning', f'DM Serif Display used for "{text[:40]}…"; keep the serif to one or two headline words', where)


# ---- HTML / CSS / SVG -----------------------------------------------------

CSS_BLOCK = re.compile(r'<style[^>]*>(.*?)</style>', re.S | re.I)
STYLE_ATTR = re.compile(r'\sstyle\s*=\s*("([^"]*)"|\'([^\']*)\')', re.I)
COLOUR_ATTR = re.compile(r'\s(?:fill|stroke|stop-color|color|bgcolor|flood-color)\s*=\s*["\']\s*#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})\b', re.I)
HEX = re.compile(r'#([0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{3})\b')
RGB = re.compile(r'rgba?\(\s*(\d+)[\s,]+(\d+)[\s,]+(\d+)(?:[\s,/]+([\d.]+%?))?\s*\)', re.I)
FONT_FAMILY = re.compile(r'font-family\s*:\s*([^;}{]+)', re.I)
FONT_ATTR = re.compile(r'\sfont-family\s*=\s*"([^"]+)"', re.I)


def check_web(report, path):
    text = Path(path).read_text('utf8', 'replace')
    is_css = path.suffix.lower() == '.css'
    css = text if is_css else '\n'.join(
        CSS_BLOCK.findall(text) + [m[1] or m[2] for m in STYLE_ATTR.findall(text)]
    )
    for h in HEX.findall(css):
        check_colour(report, h[:6] if len(h) == 8 else h, 'css')
    for h in ([] if is_css else COLOUR_ATTR.findall(text)):
        check_colour(report, h, 'attribute')
    for r, g, b, a in RGB.findall(css):
        h = '%02X%02X%02X' % tuple(min(255, int(v)) for v in (r, g, b))
        translucent = a not in ('', '1', '100%')
        check_colour(report, h, 'css', level='warning' if translucent else 'error')
    families = [f.split(',')[0] for f in FONT_FAMILY.findall(css)] + [f.split(',')[0] for f in FONT_ATTR.findall(text)]
    for f in families:
        check_font(report, f, 'font-family')
    if is_css:
        return
    uses_dm = re.search(r'DM Sans', css)
    loads_dm = re.search(r'family=DM\+Sans|@font-face[^}]*DM Sans|fonts\.bunny\.net[^"]*dm-sans', text, re.I)
    if uses_dm and not loads_dm and path.suffix.lower() != '.svg':
        report.add('warning', 'DM Sans is used but never loaded; add the Google Fonts link (see SKILL.md section 5)')
    weights = re.search(r'family=DM\+Sans:[^"&\']*wght@([^"&\']*)', text)
    if loads_dm and re.search(r'family=DM\+Sans', text) and not (weights and ('..' in weights[1] or '600' in weights[1])):
        report.add('warning', 'DM Sans is loaded without weight 600; semibold headings will fall back to regular (load the range wght@100..1000)')
    if not (LOGO_DOT_PATH in text or re.search(r'insighture-logo|logo-(black|white)', text, re.I)):
        report.add('warning', 'no Insighture logo found; inline the logo SVG or use assets/logo/')
    rose_uses = len(re.findall(r'#ee4065\b', text, re.I))
    if rose_uses > 6:
        report.add('warning', f'rose #EE4065 appears {rose_uses} times; check there is one rose moment per view')


# ---- PDF ------------------------------------------------------------------

def pdf_streams(data):
    for m in re.finditer(rb'stream\r?\n', data):
        start = m.end()
        end = data.find(b'endstream', start)
        if end < 0:
            break
        chunk = data[start:end]
        try:
            yield zlib.decompress(chunk)
        except zlib.error:
            yield chunk


def check_pdf(report, path):
    data = Path(path).read_bytes()
    if not data.startswith(b'%PDF'):
        report.add('error', 'not a PDF')
        return
    blobs = [data] + list(pdf_streams(data))
    fonts = set()
    num = rb'(\d*\.?\d+)'
    colour_op = re.compile(num + rb'\s+' + num + rb'\s+' + num + rb'\s+(?:rg|RG|sc|SC|scn|SCN)\b')
    # Chrome resets the colour to black before drawing an image or form; not a real fill.
    reset = re.compile(rb'(?:[\d.]+\s+[\d.]+\s+[\d.]+\s+(?:RG|rg)\s+)+(?=(?:/\w+\s+gs\s+)?/\w+\s+Do)')
    for blob in blobs:
        blob = reset.sub(b'', blob)
        for f in re.findall(rb'/BaseFont\s*/([A-Za-z0-9+_.,-]+)', blob):
            fonts.add(f.decode('latin1').split('+')[-1])
        for r, g, b in colour_op.findall(blob):
            vals = [float(v) for v in (r, g, b)]
            if any(v > 1 for v in vals):
                continue
            h = '%02X%02X%02X' % tuple(round(v * 255) for v in vals)
            check_colour(report, h, 'content stream', level='warning', tolerance=2)
    for f in sorted(fonts):
        check_font(report, re.sub(r'(MT|PS)?([-,].*)?$', '', f), 'embedded font')
    if not fonts:
        report.add('warning', 'no embedded fonts found; embed DM Sans')


# ---- main -----------------------------------------------------------------

HANDLERS = {
    **dict.fromkeys(('.pptx', '.potx', '.docx', '.dotx', '.xlsx', '.xltx'), check_ooxml),
    **dict.fromkeys(('.html', '.htm', '.css', '.svg'), check_web),
    '.pdf': check_pdf,
}


def check(path):
    path = Path(path)
    report = Report(path)
    handler = HANDLERS.get(path.suffix.lower())
    report.bad_input = not path.is_file() or not handler
    if not path.is_file():
        report.add('error', 'file not found')
    elif not handler:
        report.add('error', f'unsupported file type {path.suffix}; supported: {", ".join(sorted(HANDLERS))}')
    else:
        handler(report, path)
    return report


def main(argv):
    as_json = '--json' in argv
    files = [a for a in argv if a != '--json']
    if not files:
        print(__doc__.strip(), file=sys.stderr)
        return 2
    reports = [check(f) for f in files]
    if as_json:
        print(json.dumps([{'file': r.path, 'errors': r.errors, 'warnings': r.warnings, 'findings': r.findings} for r in reports], indent=2))
    else:
        for r in reports:
            print(r.path)
            for f in sorted(r.findings, key=lambda f: f['level'] != 'error'):
                where = ''
                if f['where']:
                    shown = ', '.join(f['where'][:4]) + (', …' if len(f['where']) > 4 else '')
                    where = f'  [{shown}]'
                times = f' ×{f["count"]}' if f['count'] > 1 else ''
                print(f'  {f["level"].upper():7} {f["message"]}{times}{where}')
            verdict = 'FAIL' if r.errors else 'PASS'
            print(f'  {verdict}: {r.errors} error(s), {r.warnings} warning(s)\n')
    if any(r.bad_input for r in reports):
        return 2
    return 1 if any(r.errors for r in reports) else 0


if __name__ == '__main__':
    sys.exit(main(sys.argv[1:]))
