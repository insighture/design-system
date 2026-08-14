import {
  Badge,
  Button,
  Card,
  CardBody,
  Heading,
  InsightureProvider,
  Stack,
  Text,
} from '@insighture/design-system';

const Sample = ({ label }: { label: string }) => (
  <Card style={{ width: 260 }}>
    <CardBody>
      <Stack direction="row" justify="between" align="center" gap="sm">
        <Text size="xs" caps tone="tertiary">{label}</Text>
        <Badge tone="success" dot>Live</Badge>
      </Stack>
      <Heading level={3} size="xs">Insight, engineered.</Heading>
      <Text size="sm" tone="secondary">
        Every token below the provider follows its theme.
      </Text>
      <Stack direction="row" gap="xs">
        <Button size="sm">Primary</Button>
        <Button size="sm" variant="outline">Outline</Button>
      </Stack>
    </CardBody>
  </Card>
);

export const LightTheme = () => (
  <InsightureProvider theme="light" fullBleed={false}>
    <div style={{ padding: 16 }}>
      <Sample label="Light" />
    </div>
  </InsightureProvider>
);

export const DarkTheme = () => (
  <InsightureProvider theme="dark" fullBleed={false}>
    <div style={{ padding: 16, background: 'var(--ins-bg-canvas)' }}>
      <Sample label="Dark" />
    </div>
  </InsightureProvider>
);
