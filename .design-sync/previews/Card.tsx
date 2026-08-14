import {
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Progress,
  Stack,
  Text,
} from '@insighture/design-system';

export const Composed = () => (
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
        All 14 scheduled jobs completed. Median runtime dropped by 12% after the
        partition change.
      </Text>
      <Progress value={92} tone="success" label="Success rate" showValue />
    </CardBody>
    <CardFooter>
      <Button variant="ghost" size="sm">Dismiss</Button>
      <Button size="sm">View report</Button>
    </CardFooter>
  </Card>
);

export const Variants = () => (
  <Stack direction="row" gap="md" wrap align="start">
    <Card variant="elevated" style={{ width: 190 }}>
      <Text size="sm" weight="medium">Elevated</Text>
      <Text size="xs" tone="tertiary">Content on the canvas</Text>
    </Card>
    <Card variant="outlined" style={{ width: 190 }}>
      <Text size="sm" weight="medium">Outlined</Text>
      <Text size="xs" tone="tertiary">Nested in a surface</Text>
    </Card>
    <Card variant="filled" style={{ width: 190 }}>
      <Text size="sm" weight="medium">Filled</Text>
      <Text size="xs" tone="tertiary">A recessed panel</Text>
    </Card>
    <Card variant="accent" style={{ width: 190 }}>
      <Text size="sm" weight="medium">Accent</Text>
      <Text size="xs" tone="tertiary">One per view, at most</Text>
    </Card>
  </Stack>
);

export const Interactive = () => (
  <Card interactive as="a" style={{ width: 280 }}>
    <CardBody>
      <Text size="xs" caps tone="accent">Featured</Text>
      <Heading level={3} size="xs">Insight, delivered weekly</Heading>
      <Text size="sm" tone="secondary">
        The whole card is the click target.
      </Text>
    </CardBody>
  </Card>
);
