import { Stack, Switch } from '@insighture/design-system';

export const WithHint = () => (
  <Stack gap="md" style={{ minWidth: 320 }}>
    <Switch
      label="Product notifications"
      hint="Push alerts for pipeline failures."
      defaultChecked
    />
  </Stack>
);

export const States = () => (
  <Stack gap="md" style={{ minWidth: 320 }}>
    <Switch label="Off" />
    <Switch label="On" defaultChecked />
    <Switch label="Disabled" disabled />
    <Switch label="Disabled, on" defaultChecked disabled />
  </Stack>
);

export const SettingsRow = () => (
  <Stack gap="md" style={{ minWidth: 340 }}>
    <Switch
      label="Two-factor authentication"
      hint="Required for admins."
      labelPosition="start"
      defaultChecked
    />
    <Switch label="Weekly digest" labelPosition="start" />
  </Stack>
);

export const Sizes = () => (
  <Stack gap="md" style={{ minWidth: 320 }}>
    <Switch label="Small" size="sm" defaultChecked />
    <Switch label="Medium" size="md" defaultChecked />
  </Stack>
);
