const { Badge, Button, Heading, Stack, Text } = window.Insighture;

mount(
  h('div', { className: 'scene', style: { width: 1040, background: 'var(--ins-bg-surface)' } },
    h('div', { style: {
      height: 6, borderRadius: 999, marginBottom: 40,
      background: 'var(--ins-gradient-brand)',
    } }),
    h(Stack, { gap: 'lg' },
      h(Text, { size: 'sm', caps: true, tone: 'accent' }, 'Insighture'),
      h(Heading, { level: 1, size: 'display', style: { maxWidth: 900 } },
        'Design System'),
      h(Text, { size: 'lg', tone: 'secondary', relaxed: true, style: { maxWidth: 620 } },
        'Tokens, primitives and 28 React components. Built from the Insighture ' +
        'mark: white and near-black carry the system, coral orange is the accent, ' +
        'and blue appears only where it earns its place.'),
      h(Stack, { direction: 'row', gap: 'sm', align: 'center', style: { marginTop: 8 } },
        h(Button, { size: 'lg' }, 'Get started'),
        h(Button, { size: 'lg', variant: 'emphasis' }, 'View components'),
        h(Button, { size: 'lg', variant: 'ghost' }, 'Read the docs')),
      h(Stack, { direction: 'row', gap: 'xs', align: 'center', style: { marginTop: 16 } },
        h(Badge, { tone: 'success', dot: true }, '28 components'),
        h(Badge, { tone: 'info', dot: true }, 'Light + dark'),
        h(Badge, { tone: 'neutral', dot: true }, 'Inter'),
        h(Badge, { tone: 'accent', dot: true }, 'Self-hosted fonts'))),
  ),
  'light',
);
