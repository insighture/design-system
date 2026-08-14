import { Alert, Button, Stack } from '@insighture/design-system';

export const Tones = () => (
  <Stack gap="sm" style={{ minWidth: 420 }}>
    <Alert tone="info" title="Heads up">
      The nightly sync completed with two skipped records.
    </Alert>
    <Alert tone="success" title="Deployed">
      Version 2.4.0 is live in production.
    </Alert>
    <Alert tone="warning" title="Quota at 82%">
      Consider upgrading before the end of the billing period.
    </Alert>
    <Alert tone="danger" title="Connection lost">
      We could not reach the warehouse for the last three attempts.
    </Alert>
  </Stack>
);

export const Variants = () => (
  <Stack gap="sm" style={{ minWidth: 420 }}>
    <Alert tone="info" title="Default">
      A neutral card — only the icon carries colour.
    </Alert>
    <Alert tone="info" variant="outline" title="Outline">
      The tone moves to the whole border.
    </Alert>
    <Alert tone="info" variant="tinted" title="Tinted">
      A filled surface. Loud — at most one per view.
    </Alert>
  </Stack>
);

export const WithAction = () => (
  <Stack gap="sm" style={{ minWidth: 420 }}>
    <Alert
      tone="danger"
      title="Connection lost"
      actions={<Button size="sm" variant="danger">Retry</Button>}
    >
      We could not reach the warehouse for the last three attempts.
    </Alert>
  </Stack>
);

export const Dismissible = () => (
  <Stack gap="sm" style={{ minWidth: 420 }}>
    <Alert tone="success" title="Deployed" onDismiss={() => {}}>
      Version 2.4.0 is live in production.
    </Alert>
  </Stack>
);
