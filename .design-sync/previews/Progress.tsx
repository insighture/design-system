import { Progress, Stack } from '@insighture/design-system';

export const WithLabel = () => (
  <Stack gap="md" style={{ minWidth: 320 }}>
    <Progress value={64} label="Migration" showValue />
    <Progress value={92} tone="success" label="Success rate" showValue />
  </Stack>
);

export const Tones = () => (
  <Stack gap="md" style={{ minWidth: 320 }}>
    <Progress value={72} tone="accent" label="Accent" />
    <Progress value={72} tone="info" label="Info" />
    <Progress value={72} tone="success" label="Success" />
    <Progress value={72} tone="warning" label="Warning" />
    <Progress value={72} tone="danger" label="Danger" />
  </Stack>
);

export const Sizes = () => (
  <Stack gap="md" style={{ minWidth: 320 }}>
    <Progress value={45} size="sm" label="Small" />
    <Progress value={45} size="md" label="Medium" />
  </Stack>
);

export const Indeterminate = () => (
  <Stack gap="md" style={{ minWidth: 320 }}>
    <Progress label="Preparing export" />
  </Stack>
);
