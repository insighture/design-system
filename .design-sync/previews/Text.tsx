import { Stack, Text } from '@insighture/design-system';

export const Sizes = () => (
  <Stack gap="xs" style={{ minWidth: 420 }}>
    <Text size="xl">Extra large — 22px</Text>
    <Text size="lg">Large — 18px</Text>
    <Text size="md">Medium — 16px, the body default</Text>
    <Text size="sm">Small — 14px, dense UI</Text>
    <Text size="xs">Extra small — 12px, hints</Text>
    <Text size="2xs">Micro — 11px, metadata</Text>
  </Stack>
);

export const Tones = () => (
  <Stack gap="xs" style={{ minWidth: 420 }}>
    <Text tone="primary">Primary — body copy</Text>
    <Text tone="secondary">Secondary — supporting detail</Text>
    <Text tone="tertiary">Tertiary — hints and metadata</Text>
    <Text tone="accent">Accent — brand emphasis</Text>
    <Text tone="success">Success</Text>
    <Text tone="warning">Warning</Text>
    <Text tone="danger">Danger</Text>
  </Stack>
);

export const Weights = () => (
  <Stack gap="xs" style={{ minWidth: 420 }}>
    <Text weight="regular">Regular — 400</Text>
    <Text weight="medium">Medium — 500</Text>
    <Text weight="semibold">Semibold — 600</Text>
    <Text weight="bold">Bold — 700</Text>
  </Stack>
);

export const Paragraph = () => (
  <Stack gap="xs" style={{ maxWidth: 460 }}>
    <Text size="xs" caps tone="tertiary">Eyebrow label</Text>
    <Text relaxed>
      Body copy is DM Sans at 16px with a 1.5 line height. It stays legible on
      the white page and on the dark teal ground, and the type scale steps in
      ratios that hold up at both ends.
    </Text>
  </Stack>
);

export const Truncated = () => (
  <Stack gap="xs" style={{ width: 260 }}>
    <Text truncate>
      A single line that is far too long for its container and therefore ends in
      an ellipsis
    </Text>
  </Stack>
);
