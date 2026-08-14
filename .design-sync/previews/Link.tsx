import { Link, Stack, Text } from '@insighture/design-system';

export const Tones = () => (
  <Stack gap="xs" style={{ minWidth: 320 }}>
    <Link href="#default">A default link</Link>
    <Link href="#accent" tone="accent">An accent link</Link>
    <Link href="#subtle" subtle>A subtle link — underlines on hover</Link>
  </Stack>
);

export const External = () => (
  <Stack gap="xs" style={{ minWidth: 320 }}>
    <Link href="https://insighture.com" external>insighture.com</Link>
  </Stack>
);

export const InProse = () => (
  <Stack gap="xs" style={{ maxWidth: 420 }}>
    <Text relaxed>
      Pipelines run nightly. See the{' '}
      <Link href="#schedule">schedule</Link> for exact timings, or{' '}
      <Link href="https://insighture.com" external>read the docs</Link>.
    </Text>
  </Stack>
);
