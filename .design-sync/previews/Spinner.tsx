import { Spinner, Stack, Text } from '@insighture/design-system';

export const Sizes = () => (
  <Stack direction="row" gap="lg" align="center">
    <Spinner size="xs" />
    <Spinner size="sm" />
    <Spinner size="md" />
    <Spinner size="lg" />
  </Stack>
);

export const Tones = () => (
  <Stack direction="row" gap="lg" align="center">
    <Spinner tone="accent" />
    <Spinner tone="neutral" />
  </Stack>
);

export const InlineWithLabel = () => (
  <Stack direction="row" gap="xs" align="center">
    <Spinner size="sm" label={null} />
    <Text size="sm" tone="secondary">Loading pipeline runs…</Text>
  </Stack>
);
