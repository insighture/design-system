/// <reference types="vite/client" />
/**
 * Logo and templates, for the local showcase. Everything is imported from the
 * real files in brand/logo/, templates/ and docs/assets/, so the preview shows
 * (and downloads) exactly what the repo ships.
 */
import { Heading, Stack, Text, useInsightureTheme } from '../src';

import logoBlack from '../brand/logo/insighture-logo-black.svg?url';
import logoWhite from '../brand/logo/insighture-logo-white.svg?url';
import logoWhiteMono from '../brand/logo/insighture-logo-white-mono.svg?url';
import logoBlackMono from '../brand/logo/insighture-logo-black-mono.svg?url';

import gallerySlides from '../docs/assets/templates-slides.png?url';
import galleryDocuments from '../docs/assets/templates-documents.png?url';

import potx from '../templates/powerpoint/Insighture.potx?url';
import pptx from '../templates/powerpoint/Insighture-sample.pptx?url';
import reportDotx from '../templates/word/Insighture-report.dotx?url';
import reportDocx from '../templates/word/Insighture-report-sample.docx?url';
import letterDotx from '../templates/word/Insighture-letterhead.dotx?url';
import reportPdf from '../templates/pdf/Insighture-report.pdf?url';
import onePagerPdf from '../templates/pdf/Insighture-one-pager.pdf?url';
import emailHtml from '../templates/email/newsletter.html?url';
import socialLinkedin from '../templates/social/linkedin-1200x627.png?url';
import socialQuote from '../templates/social/quote-1080x1080.png?url';
import socialStat from '../templates/social/stat-1080x1350.png?url';

/** The logo version for the current theme's ground. */
export function ThemeLogo({ height = 28 }: { height?: number }) {
  const { theme } = useInsightureTheme();
  return <img src={theme === 'dark' ? logoWhite : logoBlack} alt="Insighture" style={{ height, width: 'auto', display: 'block', alignSelf: 'flex-start' }} />;
}

const LOGOS = [
  { src: logoBlack, file: 'insighture-logo-black.svg', name: 'Primary', use: 'On white', bg: 'var(--ins-brand-white)', fg: 'var(--ins-neutral-600)' },
  { src: logoWhite, file: 'insighture-logo-white.svg', name: 'Reversed', use: 'On dark teal', bg: 'var(--ins-brand-deep-teal)', fg: 'var(--ins-deep-200)' },
  { src: logoWhiteMono, file: 'insighture-logo-white-mono.svg', name: 'White mono', use: 'On rose and photos', bg: 'var(--ins-gradient-rose)', fg: 'rgba(255,255,255,.85)' },
  { src: logoBlackMono, file: 'insighture-logo-black-mono.svg', name: 'Black mono', use: 'Single-colour print', bg: 'var(--ins-neutral-100)', fg: 'var(--ins-neutral-600)' },
];

export function LogoSection() {
  return (
    <div className="pv-logos">
      {LOGOS.map((l) => (
        <a key={l.file} className="pv-logo" href={l.src} download={l.file} style={{ background: l.bg }}>
          <img src={l.src} alt={`Insighture logo, ${l.name}`} />
          <span style={{ color: l.fg }}>
            <b>{l.name}</b> · {l.use}
          </span>
        </a>
      ))}
    </div>
  );
}

type Download = { label: string; href: string; file: string; kind: string };
const GROUPS: { title: string; note: string; items: Download[] }[] = [
  {
    title: 'PowerPoint',
    note: 'Eight brand layouts, theme colours and fonts, nine example slides.',
    items: [
      { label: 'Template', href: potx, file: 'Insighture.potx', kind: '.potx' },
      { label: 'Sample deck', href: pptx, file: 'Insighture-sample.pptx', kind: '.pptx' },
    ],
  },
  {
    title: 'Word',
    note: 'A4 report with rose cover and brand styles, a filled sample, and a letterhead.',
    items: [
      { label: 'Report template', href: reportDotx, file: 'Insighture-report.dotx', kind: '.dotx' },
      { label: 'Sample report', href: reportDocx, file: 'Insighture-report-sample.docx', kind: '.docx' },
      { label: 'Letterhead', href: letterDotx, file: 'Insighture-letterhead.dotx', kind: '.dotx' },
    ],
  },
  {
    title: 'PDF',
    note: 'A4, fonts embedded. Rebuilt from editable HTML in templates/pdf/src/.',
    items: [
      { label: 'Report', href: reportPdf, file: 'Insighture-report.pdf', kind: '.pdf' },
      { label: 'One-pager', href: onePagerPdf, file: 'Insighture-one-pager.pdf', kind: '.pdf' },
    ],
  },
  {
    title: 'Email and social',
    note: 'Table-based newsletter, plus LinkedIn, square and portrait cards.',
    items: [
      { label: 'Newsletter', href: emailHtml, file: 'newsletter.html', kind: '.html' },
      { label: 'LinkedIn card', href: socialLinkedin, file: 'linkedin-1200x627.png', kind: '.png' },
      { label: 'Quote card', href: socialQuote, file: 'quote-1080x1080.png', kind: '.png' },
      { label: 'Stat card', href: socialStat, file: 'stat-1080x1350.png', kind: '.png' },
    ],
  },
];

// Things a browser can show are opened; Office files are downloaded.
const opens = (kind: string) => ['.pdf', '.html', '.png'].includes(kind);

export function TemplatesSection() {
  return (
    <Stack gap="lg">
      <figure className="pv-gallery">
        <img src={gallerySlides} alt="Slides from the PowerPoint template" />
      </figure>
      <figure className="pv-gallery">
        <img src={galleryDocuments} alt="Word, PDF, social and email templates" />
      </figure>
      <div className="pv-grid">
        {GROUPS.map((g) => (
          <Stack key={g.title} gap="xs">
            <Heading level={3} size="xs">
              {g.title}
            </Heading>
            <Text size="sm" tone="secondary">
              {g.note}
            </Text>
            <Stack direction="row" gap="xs" wrap>
              {g.items.map((d) => (
                <a
                  key={d.file}
                  href={d.href}
                  {...(opens(d.kind) ? { target: '_blank', rel: 'noreferrer' } : { download: d.file })}
                  className="pv-download"
                >
                  {d.label}
                  <span className="pv-download__kind">{d.kind}</span>
                </a>
              ))}
            </Stack>
          </Stack>
        ))}
      </div>
      <Text size="xs" tone="tertiary">
        Install DM Sans (static files) and DM Serif Display before opening the Office templates. Rebuild everything with{' '}
        <code>npm run templates</code>.
      </Text>
    </Stack>
  );
}
