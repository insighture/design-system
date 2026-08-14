import { Stack, Textarea } from '@insighture/design-system';

export const WithHint = () => (
  <Stack gap="md" style={{ minWidth: 340 }}>
    <Textarea
      label="Project brief"
      placeholder="What are we building?"
      hint="Markdown is supported."
    />
  </Stack>
);

export const Filled = () => (
  <Stack gap="md" style={{ minWidth: 340 }}>
    <Textarea
      label="Release notes"
      rows={4}
      defaultValue={'Partitioned the events table by day.\nMedian query time dropped from 4.1s to 0.6s.'}
    />
  </Stack>
);

export const Invalid = () => (
  <Stack gap="md" style={{ minWidth: 340 }}>
    <Textarea
      label="Summary"
      defaultValue="Too short"
      error="Summaries must be at least 40 characters."
    />
  </Stack>
);
