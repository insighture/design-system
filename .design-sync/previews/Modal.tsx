import {
  Button,
  Card,
  CardBody,
  Heading,
  Modal,
  Stack,
  Text,
} from '@insighture/design-system';

/** A sized page behind the dialog: without it the fixed overlay leaves the
 *  card root at 0px, and the preview shows nothing. */
const Page = ({ children }: { children: React.ReactNode }) => (
  <div style={{ position: 'relative', minHeight: 380, width: '100%' }}>
    <Stack gap="md" style={{ padding: 24, opacity: 0.5 }}>
      <Heading level={2} size="sm">Workspace settings</Heading>
      <Card variant="outlined">
        <CardBody>
          <Text size="sm" tone="secondary">Page content behind the dialog.</Text>
        </CardBody>
      </Card>
    </Stack>
    {children}
  </div>
);

export const Confirmation = () => (
  <Page>
  <Modal
    open
    onClose={() => {}}
    title="Publish this workspace?"
    description="Everyone in your organisation will get access immediately."
    footer={
      <>
        <Button variant="ghost">Cancel</Button>
        <Button>Publish</Button>
      </>
    }
  >
    <Text size="sm" tone="secondary">
      Publishing shares every dashboard in this workspace. You can revoke access
      at any time from settings.
    </Text>
  </Modal>
  </Page>
);

export const Destructive = () => (
  <Page>
  <Modal
    open
    onClose={() => {}}
    size="sm"
    title="Delete this pipeline?"
    closeOnOverlayClick={false}
    footer={
      <>
        <Button variant="ghost">Keep it</Button>
        <Button variant="danger">Delete</Button>
      </>
    }
  >
    <Text size="sm" tone="secondary">
      This cannot be undone. 14 scheduled runs will be cancelled.
    </Text>
  </Modal>
  </Page>
);
