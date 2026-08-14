import { Divider, Stack, Text } from '@insighture/design-system';

export const Horizontal = () => (
  <Stack gap="md" style={{ minWidth: 340 }}>
    <Text size="sm" tone="secondary">Above the rule</Text>
    <Divider />
    <Text size="sm" tone="secondary">Below the rule</Text>
  </Stack>
);

export const WithLabel = () => (
  <Stack gap="md" style={{ minWidth: 340 }}>
    <Text size="sm" tone="secondary">Sign in with email</Text>
    <Divider label="Or continue with" />
    <Text size="sm" tone="secondary">Single sign-on</Text>
  </Stack>
);

export const Vertical = () => (
  <Stack direction="row" gap="md" align="center">
    <Text size="sm">Overview</Text>
    <Divider orientation="vertical" />
    <Text size="sm">Activity</Text>
    <Divider orientation="vertical" />
    <Text size="sm">Settings</Text>
  </Stack>
);

export const Subtle = () => (
  <Stack gap="md" style={{ minWidth: 340 }}>
    <Text size="sm" tone="secondary">Dense grouping</Text>
    <Divider subtle />
    <Text size="sm" tone="secondary">Uses the subtle border token</Text>
  </Stack>
);
