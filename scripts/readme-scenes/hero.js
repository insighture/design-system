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
        'One system, ', h('em', null, 'everywhere.')),
      h(Text, { size: 'lg', tone: 'secondary', relaxed: true, style: { maxWidth: 620 } },
        'One brand system for documents, slides, websites and everything else. ' +
        'White and black carry the content, dark teal is the ground, and ' +
        'crimson rose marks the one thing that matters.'),
      h(Stack, { direction: 'row', gap: 'sm', align: 'center', style: { marginTop: 8 } },
        h(Button, { size: 'lg' }, 'Get started'),
        h(Button, { size: 'lg', variant: 'emphasis' }, 'View components'),
        h(Button, { size: 'lg', variant: 'ghost' }, 'Read the docs')),
      h(Stack, { direction: 'row', gap: 'xs', align: 'center', style: { marginTop: 16 } },
        h(Badge, { tone: 'accent', dot: true }, 'Docs · Slides · Web'),
        h(Badge, { tone: 'info', dot: true }, 'Light + dark'),
        h(Badge, { tone: 'neutral', dot: true }, 'DM Sans'),
        h(Badge, { tone: 'success', dot: true }, '28 components'))),
  ),
  'light',
);
