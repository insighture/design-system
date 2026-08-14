import { Button, Stack } from '@insighture/design-system';

export const Variants = () => (
  <Stack direction="row" gap="xs" wrap align="center">
    <Button variant="primary">Save changes</Button>
    <Button variant="emphasis">Start free trial</Button>
    <Button variant="secondary">Duplicate</Button>
    <Button variant="outline">Export CSV</Button>
    <Button variant="ghost">Cancel</Button>
    <Button variant="danger">Delete workspace</Button>
  </Stack>
);

export const Sizes = () => (
  <Stack direction="row" gap="xs" align="center">
    <Button size="sm">Small</Button>
    <Button size="md">Medium</Button>
    <Button size="lg">Large</Button>
  </Stack>
);

export const WithIcons = () => (
  <Stack direction="row" gap="xs" wrap align="center">
    <Button startIcon="+">New report</Button>
    <Button variant="outline" endIcon="→">Continue</Button>
  </Stack>
);

export const States = () => (
  <Stack direction="row" gap="xs" wrap align="center">
    <Button loading>Saving</Button>
    <Button disabled>Unavailable</Button>
    <Button variant="secondary" disabled>Disabled</Button>
  </Stack>
);

export const FullWidth = () => (
  <Stack gap="xs" style={{ maxWidth: 320 }}>
    <Button fullWidth>Create workspace</Button>
    <Button fullWidth variant="ghost">Not now</Button>
  </Stack>
);
