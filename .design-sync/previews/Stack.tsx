import { Badge, Card, Stack, Text } from '@insighture/design-system';

const Box = ({ children }: { children: React.ReactNode }) => (
  <Card variant="filled" padding="sm" style={{ minWidth: 72 }}>
    <Text size="xs" tone="secondary">{children}</Text>
  </Card>
);

export const Column = () => (
  <Stack gap="sm" style={{ minWidth: 220 }}>
    <Box>First</Box>
    <Box>Second</Box>
    <Box>Third</Box>
  </Stack>
);

export const Row = () => (
  <Stack direction="row" gap="sm">
    <Box>First</Box>
    <Box>Second</Box>
    <Box>Third</Box>
  </Stack>
);

export const GapScale = () => (
  <Stack gap="md" style={{ minWidth: 300 }}>
    <Stack direction="row" gap="2xs"><Box>2xs</Box><Box>gap</Box></Stack>
    <Stack direction="row" gap="sm"><Box>sm</Box><Box>gap</Box></Stack>
    <Stack direction="row" gap="lg"><Box>lg</Box><Box>gap</Box></Stack>
  </Stack>
);

export const SpaceBetween = () => (
  <Stack direction="row" justify="between" align="center" gap="md" style={{ minWidth: 340 }}>
    <Text size="sm" weight="medium">Pipeline health</Text>
    <Badge tone="success" dot>Healthy</Badge>
  </Stack>
);
