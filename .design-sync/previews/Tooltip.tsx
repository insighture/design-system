import { Button, IconButton, Stack, Tooltip } from '@insighture/design-system';

export const OnAnIconButton = () => (
  <Stack direction="row" gap="lg" align="center" style={{ padding: '56px 40px 40px' }}>
    <Tooltip content="Workspace settings" defaultOpen>
      <IconButton aria-label="Settings" variant="outline">⚙</IconButton>
    </Tooltip>
    <Tooltip content="Add a new report" placement="bottom">
      <IconButton aria-label="Add report" variant="primary" round>+</IconButton>
    </Tooltip>
  </Stack>
);

export const Placements = () => (
  <Stack direction="row" gap="2xl" align="center" style={{ padding: 56 }}>
    <Tooltip content="Above" placement="top" defaultOpen>
      <Button variant="outline" size="sm">Top</Button>
    </Tooltip>
    <Tooltip content="Below" placement="bottom" defaultOpen>
      <Button variant="outline" size="sm">Bottom</Button>
    </Tooltip>
    <Tooltip content="Left" placement="left" defaultOpen>
      <Button variant="outline" size="sm">Left</Button>
    </Tooltip>
    <Tooltip content="Right" placement="right" defaultOpen>
      <Button variant="outline" size="sm">Right</Button>
    </Tooltip>
  </Stack>
);
