import { Stack, Tag } from '@insighture/design-system';

export const Colors = () => (
  <Stack direction="row" gap="xs" wrap align="center">
    <Tag color="neutral" swatch>Archived</Tag>
    <Tag color="coral" swatch>Design</Tag>
    <Tag color="azure" swatch>Engineering</Tag>
    <Tag color="amber" swatch>Operations</Tag>
    <Tag color="yellow" swatch>Marketing</Tag>
    <Tag color="green" swatch>Research</Tag>
  </Stack>
);

export const Removable = () => (
  <Stack direction="row" gap="xs" wrap align="center">
    <Tag color="coral" onRemove={() => {}}>Design</Tag>
    <Tag color="azure" onRemove={() => {}}>Engineering</Tag>
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
