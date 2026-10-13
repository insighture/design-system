import { Heading, Stack } from '@insighture/design-system';

export const Scale = () => (
  <Stack gap="sm" style={{ minWidth: 460 }}>
    <Heading level={1} size="display">Insight, <em>engineered.</em></Heading>
    <Heading level={2} size="xl">Section heading</Heading>
    <Heading level={3} size="lg">Subsection heading</Heading>
    <Heading level={4} size="md">Card title</Heading>
    <Heading level={5} size="sm">Group label</Heading>
    <Heading level={6} size="xs">Dense label</Heading>
  </Stack>
);

/* Tracking is size-dependent, so the same string reads differently at each
   step. That is the whole point of the scale. */
export const Tracking = () => (
  <Stack gap="sm" style={{ minWidth: 460 }}>
    <Heading level={2} size="display">Insight, engineered.</Heading>
    <Heading level={2} size="lg">Insight, engineered.</Heading>
    <Heading level={2} size="xs">Insight, engineered.</Heading>
  </Stack>
);

export const Tones = () => (
  <Stack gap="sm" style={{ minWidth: 460 }}>
    <Heading level={3} size="md" tone="primary">Primary</Heading>
    <Heading level={3} size="md" tone="secondary">Secondary</Heading>
    <Heading level={3} size="md" tone="accent">Accent</Heading>
  </Stack>
);

/* One or two words in DM Serif Display italic, in the accent — the brand's
   signature headline move. Write <em> inside the Heading. */
export const SerifEmphasis = () => (
  <Stack gap="sm" style={{ minWidth: 460 }}>
    <Heading level={2} size="xl">Great outcomes start with the <em>right thinking.</em></Heading>
    <Heading level={2} size="md">AWS Advanced <em>partners</em></Heading>
  </Stack>
);

export const Balanced = () => (
  <Stack gap="sm" style={{ maxWidth: 420 }}>
    <Heading level={2} size="xl" balance>
      A longer display heading that balances across its lines
    </Heading>
  </Stack>
);
