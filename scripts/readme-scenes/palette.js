const { Heading, Stack, Text } = window.Insighture;

const RAMPS = [
  ['Neutral', 'the backbone', 'neutral', [0,50,100,200,300,400,500,600,700,800,900,950]],
  ['Deep teal', 'the brand ground', 'deep', [50,100,200,300,400,500,600,700,750,800,900,950]],
  ['Crimson rose', 'the accent', 'rose', [50,100,200,300,400,500,600,700,800,900]],
  ['Teal', 'support, info', 'teal', [50,100,200,300,400,500,600,700,800,900]],
  ['Orange', 'alt', 'orange', [50,100,200,300,400,500,600,700,800,900]],
  ['Yellow', 'alt, warning', 'yellow', [50,100,200,300,400,500,600,700,800,900]],
  ['Indigo', 'alt', 'indigo', [50,100,200,300,400,500,600,700,800,900]],
  ['Green', 'success, functional', 'green', [50,100,200,300,400,500,600,700,800,900]],
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
          'Four main colours, four alts. Rose, teal and the alts sit at step 500; dark teal is deep-900; white and black are neutral 0 and 950.')),
      ...RAMPS.map(([name, role, family, steps]) =>
        h(Stack, { key: family, gap: '2xs' },
          h(Stack, { direction: 'row', gap: 'xs', align: 'baseline' },
            h(Text, { size: 'xs', caps: true, tone: 'tertiary' }, name),
            h(Text, { size: 'xs', tone: 'tertiary' }, '· ' + role)),
          h('div', { style: { display: 'flex', gap: 6 } },
            ...steps.map((s) => swatch(family, s))))))),
  'light',
);
