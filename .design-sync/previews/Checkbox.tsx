import { Checkbox, Stack } from '@insighture/design-system';

export const WithHint = () => (
  <Stack gap="xs" style={{ minWidth: 300 }}>
    <Checkbox
      label="Email me weekly insights"
      hint="A digest every Monday morning."
      defaultChecked
    />
  </Stack>
);

export const States = () => (
  <Stack gap="xs" style={{ minWidth: 300 }}>
    <Checkbox label="Unchecked" />
    <Checkbox label="Checked" defaultChecked />
    <Checkbox label="Partial selection" indeterminate />
    <Checkbox label="Unavailable option" disabled />
    <Checkbox label="Locked on" defaultChecked disabled />
  </Stack>
);

export const Invalid = () => (
  <Stack gap="xs" style={{ minWidth: 300 }}>
    <Checkbox
      label="I accept the terms"
      error="You must accept the terms to continue."
    />
  </Stack>
);

export const List = () => (
  <Stack gap="xs" style={{ minWidth: 300 }}>
    <Checkbox label="Select all" indeterminate />
    <Checkbox label="Pipeline failures" defaultChecked />
    <Checkbox label="Quota warnings" defaultChecked />
    <Checkbox label="Weekly digest" />
  </Stack>
);
