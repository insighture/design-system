import { Input, Stack } from '@insighture/design-system';

export const WithLabelAndHint = () => (
  <Stack gap="md" style={{ minWidth: 320 }}>
    <Input
      label="Work email"
      placeholder="you@insighture.com"
      hint="We only use this for workspace invitations."
      required
    />
  </Stack>
);

export const WithAffixes = () => (
  <Stack gap="md" style={{ minWidth: 320 }}>
    <Input label="Budget" prefix="$" suffix="USD" defaultValue="25,000" />
    <Input label="Workspace" prefix="insighture.com/" defaultValue="acme" />
  </Stack>
);

export const Invalid = () => (
  <Stack gap="md" style={{ minWidth: 320 }}>
    <Input
      label="Workspace slug"
      defaultValue="insighture!"
      error="Slugs can only contain letters, numbers and dashes."
    />
  </Stack>
);

export const Sizes = () => (
  <Stack gap="md" style={{ minWidth: 320 }}>
    <Input label="Small" size="sm" placeholder="sm" />
    <Input label="Medium" size="md" placeholder="md" />
    <Input label="Large" size="lg" placeholder="lg" />
  </Stack>
);

export const Disabled = () => (
  <Stack gap="md" style={{ minWidth: 320 }}>
    <Input label="Account ID" defaultValue="acct_9f21c" disabled />
  </Stack>
);
