import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Stack,
  Text,
} from '@insighture/design-system';

export const TitleAndStatus = () => (
  <Card style={{ minWidth: 340 }}>
    <CardHeader>
      <Stack gap="3xs">
        <Heading level={3} size="xs">Pipeline health</Heading>
        <Text size="xs" tone="tertiary">Last 24 hours</Text>
      </Stack>
      <Badge tone="success" dot>Healthy</Badge>
    </CardHeader>
    <CardBody>
      <Text size="sm" tone="secondary">
        The header lays out as a space-between row.
      </Text>
    </CardBody>
  </Card>
);

export const TitleOnly = () => (
  <Card style={{ minWidth: 340 }}>
    <CardHeader>
      <Heading level={3} size="xs">Recent activity</Heading>
    </CardHeader>
    <CardBody>
      <Text size="sm" tone="secondary">A single child aligns left.</Text>
    </CardBody>
  </Card>
);
