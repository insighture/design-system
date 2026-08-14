import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  Progress,
  Text,
} from '@insighture/design-system';

export const Stacked = () => (
  <Card style={{ minWidth: 340 }}>
    <CardHeader>
      <Heading level={3} size="xs">Migration</Heading>
    </CardHeader>
    <CardBody>
      <Text size="sm" tone="secondary">
        CardBody stacks its children with consistent spacing and absorbs the
        remaining height.
      </Text>
      <Progress value={64} label="Records moved" showValue />
    </CardBody>
  </Card>
);

export const TextOnly = () => (
  <Card style={{ minWidth: 340 }}>
    <CardBody>
      <Text size="sm" tone="secondary">
        A card body used on its own, with no header or footer.
      </Text>
    </CardBody>
  </Card>
);
