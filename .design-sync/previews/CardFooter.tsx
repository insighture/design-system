import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Text,
} from '@insighture/design-system';

export const Actions = () => (
  <Card style={{ minWidth: 340 }}>
    <CardBody>
      <Text size="sm" tone="secondary">
        Actions run least- to most-important, left to right.
      </Text>
    </CardBody>
    <CardFooter>
      <Button variant="ghost" size="sm">Dismiss</Button>
      <Button size="sm">View report</Button>
    </CardFooter>
  </Card>
);

export const SingleAction = () => (
  <Card style={{ minWidth: 340 }}>
    <CardBody>
      <Text size="sm" tone="secondary">A single, right-aligned action.</Text>
    </CardBody>
    <CardFooter>
      <Button size="sm" variant="outline">Manage</Button>
    </CardFooter>
  </Card>
);
