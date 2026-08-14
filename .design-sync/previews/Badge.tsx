import { Badge, Stack } from '@insighture/design-system';

/* The dot is the whole tone signal now that labels are neutral, so every tone
   story shows one. A Badge without `dot` is intentionally just a grey chip. */
export const Tones = () => (
  <Stack direction="row" gap="xs" wrap align="center">
    <Badge tone="neutral" dot>Draft</Badge>
    <Badge tone="accent" dot>Featured</Badge>
    <Badge tone="info" dot>Syncing</Badge>
    <Badge tone="success" dot>Healthy</Badge>
    <Badge tone="warning" dot>Degraded</Badge>
    <Badge tone="danger" dot>Failed</Badge>
    <Badge tone="highlight" dot>Beta</Badge>
    <Badge tone="emphasis" dot>Archived</Badge>
  </Stack>
);

/* The three loudness tiers, and the three named cases they cover. */
export const Variants = () => (
  <Stack direction="row" gap="xs" wrap align="center">
    <Badge tone="success" variant="soft" dot>Soft — neutral chip</Badge>
    <Badge tone="info" variant="solid">Beta — solid</Badge>
    <Badge tone="danger" variant="solid">Critical — solid</Badge>
    <Badge tone="success" variant="solid">New — solid</Badge>
  </Stack>
);

export const WithDot = () => (
  <Stack direction="row" gap="xs" wrap align="center">
    <Badge tone="success" dot>Live</Badge>
    <Badge tone="warning" dot>Degraded</Badge>
    <Badge tone="danger" dot>Offline</Badge>
  </Stack>
);

export const Sizes = () => (
  <Stack direction="row" gap="xs" align="center">
    <Badge tone="accent" size="sm" dot>Small</Badge>
    <Badge tone="accent" size="md" dot>Medium</Badge>
  </Stack>
);
