import { Select, Stack } from '@insighture/design-system';

const regions = [
  { label: 'Colombo (ap-south-1)', value: 'cmb' },
  { label: 'Singapore (ap-southeast-1)', value: 'sin' },
  { label: 'Frankfurt (eu-central-1)', value: 'fra' },
];

export const WithPlaceholder = () => (
  <Stack gap="md" style={{ minWidth: 320 }}>
    <Select
      label="Region"
      placeholder="Choose a region"
      defaultValue=""
      options={regions}
      hint="Data never leaves the region you pick."
    />
  </Stack>
);

export const Selected = () => (
  <Stack gap="md" style={{ minWidth: 320 }}>
    <Select label="Region" defaultValue="sin" options={regions} />
  </Stack>
);

export const Invalid = () => (
  <Stack gap="md" style={{ minWidth: 320 }}>
    <Select
      label="Region"
      defaultValue=""
      placeholder="Choose a region"
      options={regions}
      error="Pick a region to continue."
    />
  </Stack>
);

export const Sizes = () => (
  <Stack gap="md" style={{ minWidth: 320 }}>
    <Select label="Small" size="sm" defaultValue="cmb" options={regions} />
    <Select label="Large" size="lg" defaultValue="cmb" options={regions} />
  </Stack>
);
