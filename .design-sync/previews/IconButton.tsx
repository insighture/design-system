import { IconButton, Stack } from '@insighture/design-system';

export const Variants = () => (
  <Stack direction="row" gap="xs" align="center">
    <IconButton aria-label="Settings" variant="ghost">⚙</IconButton>
    <IconButton aria-label="Edit" variant="outline">✎</IconButton>
    <IconButton aria-label="Add item" variant="primary">+</IconButton>
    <IconButton aria-label="Delete" variant="danger">×</IconButton>
  </Stack>
);

export const Sizes = () => (
  <Stack direction="row" gap="xs" align="center">
    <IconButton aria-label="Search" size="sm" variant="outline">⌕</IconButton>
    <IconButton aria-label="Search" size="md" variant="outline">⌕</IconButton>
    <IconButton aria-label="Search" size="lg" variant="outline">⌕</IconButton>
  </Stack>
);

export const Round = () => (
  <Stack direction="row" gap="xs" align="center">
    <IconButton aria-label="Add" variant="primary" round>+</IconButton>
    <IconButton aria-label="More options" variant="secondary" round>⋯</IconButton>
  </Stack>
);
