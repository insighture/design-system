import { Tabs, Text } from '@insighture/design-system';

export const Underline = () => (
  <div style={{ minWidth: 420 }}>
    <Tabs
      items={[
        {
          id: 'overview',
          label: 'Overview',
          content: <Text size="sm" tone="secondary">Underline tabs suit page-level navigation.</Text>,
        },
        {
          id: 'activity',
          label: 'Activity',
          badge: 12,
          content: <Text size="sm" tone="secondary">Badges carry counts without breaking the rhythm.</Text>,
        },
        {
          id: 'settings',
          label: 'Settings',
          content: <Text size="sm" tone="secondary">Arrow keys move between tabs.</Text>,
        },
        { id: 'billing', label: 'Billing', disabled: true },
      ]}
    />
  </div>
);

export const Pill = () => (
  <div style={{ minWidth: 360 }}>
    <Tabs
      variant="pill"
      defaultValue="week"
      items={[
        { id: 'day', label: 'Day', content: <Text size="sm" tone="secondary">Today’s runs.</Text> },
        { id: 'week', label: 'Week', content: <Text size="sm" tone="secondary">The last seven days.</Text> },
        { id: 'month', label: 'Month', content: <Text size="sm" tone="secondary">The last 30 days.</Text> },
      ]}
    />
  </div>
);

export const Fitted = () => (
  <div style={{ minWidth: 360 }}>
    <Tabs
      variant="pill"
      fitted
      defaultValue="week"
      items={[
        { id: 'day', label: 'Day' },
        { id: 'week', label: 'Week' },
        { id: 'month', label: 'Month' },
      ]}
    />
  </div>
);
