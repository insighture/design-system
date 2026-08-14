const {
  Alert, Badge, Button, Card, CardBody, CardFooter, CardHeader, Checkbox,
  Heading, IconButton, Input, Progress, Select, Stack, Switch, Tabs, Tag, Text,
} = window.Insighture;

const theme = new URLSearchParams(location.search).get('theme') || 'light';

const col1 = h(Stack, { gap: 'md', style: { width: 360 } },
  h(Card, null,
    h(CardHeader, null,
      h(Stack, { gap: '3xs' },
        h(Heading, { level: 3, size: 'xs' }, 'Pipeline health'),
        h(Text, { size: 'xs', tone: 'tertiary' }, 'Last 24 hours')),
      h(Badge, { tone: 'success', dot: true }, 'Healthy')),
    h(CardBody, null,
      h(Text, { size: 'sm', tone: 'secondary' },
        'All 14 scheduled jobs completed. Median runtime dropped 12%.'),
      h(Progress, { value: 92, tone: 'success', label: 'Success rate', showValue: true })),
    h(CardFooter, null,
      h(Button, { variant: 'ghost', size: 'sm' }, 'Dismiss'),
      h(Button, { size: 'sm' }, 'View report'))),
  h(Stack, { direction: 'row', gap: 'xs', wrap: true, align: 'center' },
    h(Badge, { tone: 'neutral', dot: true }, 'Draft'),
    h(Badge, { tone: 'info', dot: true }, 'Syncing'),
    h(Badge, { tone: 'danger', variant: 'solid' }, 'Critical'),
    h(Badge, { tone: 'info', variant: 'solid' }, 'Beta'),
    h(Badge, { tone: 'success', variant: 'solid' }, 'New')),
  h(Stack, { direction: 'row', gap: 'xs', wrap: true, align: 'center' },
    h(Tag, { color: 'coral', swatch: true }, 'Design'),
    h(Tag, { color: 'azure', swatch: true }, 'Engineering'),
    h(Tag, { color: 'green', swatch: true }, 'Research'),
    h(Tag, { color: 'neutral' }, 'Archived')));

const col2 = h(Stack, { gap: 'md', style: { width: 360 } },
  h(Input, {
    label: 'Work email', placeholder: 'you@insighture.com',
    hint: 'We only use this for workspace invitations.', required: true,
  }),
  h(Select, {
    label: 'Region', defaultValue: 'cmb',
    options: [
      { label: 'Colombo (ap-south-1)', value: 'cmb' },
      { label: 'Singapore (ap-southeast-1)', value: 'sin' },
    ],
  }),
  h(Stack, { gap: 'xs' },
    h(Checkbox, { label: 'Email me weekly insights', defaultChecked: true }),
    h(Checkbox, { label: 'Partial selection', indeterminate: true })),
  h(Switch, {
    label: 'Product notifications',
    hint: 'Push alerts for pipeline failures.', defaultChecked: true,
  }));

const col3 = h(Stack, { gap: 'md', style: { width: 380 } },
  h(Alert, { tone: 'info', title: 'Heads up' },
    'The nightly sync completed with two skipped records.'),
  h(Alert, {
    tone: 'danger', title: 'Connection lost',
    actions: h(Button, { size: 'sm', variant: 'danger' }, 'Retry'),
  }, 'We could not reach the warehouse for the last three attempts.'),
  h(Tabs, {
    items: [
      { id: 'o', label: 'Overview', content: h(Text, { size: 'sm', tone: 'secondary' }, 'Underline tabs suit page-level navigation.') },
      { id: 'a', label: 'Activity', badge: 12 },
      { id: 's', label: 'Settings' },
    ],
  }),
  h(Stack, { direction: 'row', gap: 'xs', align: 'center' },
    h(Button, null, 'Primary'),
    h(Button, { variant: 'emphasis' }, 'Emphasis'),
    h(Button, { variant: 'outline' }, 'Outline'),
    h(IconButton, { 'aria-label': 'Settings', variant: 'ghost' }, '⚙')));

mount(
  h('div', {
    className: 'scene',
    style: { width: 1240, background: 'var(--ins-bg-canvas)' },
  },
    h(Stack, { direction: 'row', gap: 'lg', align: 'start' }, col1, col2, col3)),
  theme,
);
