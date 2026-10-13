import { Stack, Tag } from '@insighture/design-system';

export const Colors = () => (
  <Stack direction="row" gap="xs" wrap align="center">
    <Tag color="neutral" swatch>Archived</Tag>
    <Tag color="rose" swatch>Design</Tag>
    <Tag color="teal" swatch>Engineering</Tag>
    <Tag color="orange" swatch>Operations</Tag>
    <Tag color="yellow" swatch>Marketing</Tag>
    <Tag color="indigo" swatch>Research</Tag>
  </Stack>
);

export const Removable = () => (
  <Stack direction="row" gap="xs" wrap align="center">
    <Tag color="rose" onRemove={() => {}}>Design</Tag>
    <Tag color="teal" onRemove={() => {}}>Engineering</Tag>
    <Tag color="neutral" onRemove={() => {}}>Archived</Tag>
  </Stack>
);

export const WithoutSwatch = () => (
  <Stack direction="row" gap="xs" wrap align="center">
    <Tag color="neutral">ap-south-1</Tag>
    <Tag color="neutral">ap-southeast-1</Tag>
    <Tag color="neutral">eu-central-1</Tag>
  </Stack>
);
