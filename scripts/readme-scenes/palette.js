const { Heading, Stack, Text } = window.Insighture;

const RAMPS = [
  ['Neutral', 'the backbone', 'neutral', [0,50,100,200,300,400,500,600,700,800,900,950]],
  ['Coral', 'the accent', 'orange', [50,100,200,300,400,500,600,700,800,900]],
  ['Azure', 'support, rationed', 'azure', [50,100,200,300,400,500,600,700,800,900]],
  ['Yellow', 'highlight', 'yellow', [50,100,200,300,400,500,600,700,800,900]],
  ['Green', 'success', 'green', [50,100,200,300,400,500,600,700,800,900]],
  ['Red', 'danger', 'red', [50,100,200,300,400,500,600,700,800,900]],
];

const swatch = (family, step) =>
  h('div', { key: step, style: { flex: 1, minWidth: 0 } },
    h('div', { style: {
      height: 52, borderRadius: 'var(--ins-radius-sm)',
      background: `var(--ins-${family}-${step})`,
      border: '1px solid var(--ins-border-subtle)',
    } }),
    h('div', { style: {
      marginTop: 6, textAlign: 'center', fontSize: 11,
      color: 'var(--ins-text-tertiary)', fontVariantNumeric: 'tabular-nums',
    } }, step));

mount(
  h('div', { className: 'scene', style: { width: 1200, background: 'var(--ins-bg-surface)' } },
    h(Stack, { gap: 'lg' },
      h(Stack, { gap: '2xs' },
        h(Heading, { level: 2, size: 'md' }, 'Colour'),
        h(Text, { size: 'sm', tone: 'secondary' },
          'Ramps generated in HLS with hue rotation on the dark steps, so shades stay chromatic instead of going muddy.')),
      ...RAMPS.map(([name, role, family, steps]) =>
        h(Stack, { key: family, gap: '2xs' },
          h(Stack, { direction: 'row', gap: 'xs', align: 'baseline' },
            h(Text, { size: 'xs', caps: true, tone: 'tertiary' }, name),
            h(Text, { size: 'xs', tone: 'tertiary' }, '· ' + role)),
          h('div', { style: { display: 'flex', gap: 6 } },
            ...steps.map((s) => swatch(family, s))))))),
  'light',
);
