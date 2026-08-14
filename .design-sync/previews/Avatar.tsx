import { Avatar, Stack } from '@insighture/design-system';

export const Sizes = () => (
  <Stack direction="row" gap="md" align="center">
    <Avatar name="Chathushka Perera" size="xs" />
    <Avatar name="Chathushka Perera" size="sm" />
    <Avatar name="Chathushka Perera" size="md" />
    <Avatar name="Chathushka Perera" size="lg" />
    <Avatar name="Chathushka Perera" size="xl" />
  </Stack>
);

export const WithStatus = () => (
  <Stack direction="row" gap="md" align="center">
    <Avatar name="Ada Lovelace" status="online" />
    <Avatar name="Grace Hopper" status="away" />
    <Avatar name="Alan Turing" status="busy" />
    <Avatar name="Katherine Johnson" status="offline" />
  </Stack>
);

export const Square = () => (
  <Stack direction="row" gap="md" align="center">
    <Avatar name="Insighture" square size="lg" />
    <Avatar name="Acme Corp" square size="md" />
  </Stack>
);

export const Group = () => (
  <Stack direction="row" gap="2xs" align="center">
    <Avatar name="Ada Lovelace" size="sm" />
    <Avatar name="Grace Hopper" size="sm" />
    <Avatar name="Alan Turing" size="sm" />
    <Avatar size="sm">+4</Avatar>
  </Stack>
);
