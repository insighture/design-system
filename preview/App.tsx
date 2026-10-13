import { useState } from 'react';
import {
  Alert,
  Avatar,
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Checkbox,
  Divider,
  Heading,
  IconButton,
  InsightureProvider,
  Input,
  Link,
  Modal,
  Progress,
  Radio,
  RadioGroup,
  Select,
  Spinner,
  Stack,
  Switch,
  Tabs,
  Tag,
  Text,
  Textarea,
  Tooltip,
  palette,
  useInsightureTheme,
  type InsightureTheme,
} from '../src';
import './preview.css';

function Section({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="pv-section">
      <Stack gap="2xs">
        <Heading level={2} size="md">
          {title}
        </Heading>
        {description && (
          <Text size="sm" tone="secondary">
            {description}
          </Text>
        )}
      </Stack>
      <div className="pv-section__body">{children}</div>
    </section>
  );
}

function Swatches() {
  const ramps: [string, Record<string, string>][] = [
    ['Neutral — the backbone', palette.neutral],
    ['Deep teal — the brand ground', palette.deep],
    ['Crimson rose — the accent', palette.rose],
    ['Teal — support, info', palette.teal],
    ['Orange — alt', palette.orange],
    ['Yellow — alt, warning', palette.yellow],
    ['Indigo — alt', palette.indigo],
    ['Green — success (functional)', palette.green],
    ['Red — danger', palette.red],
  ];

  return (
    <Stack gap="md">
      {ramps.map(([name, ramp]) => (
        <Stack key={name} gap="2xs">
          <Text size="xs" caps tone="tertiary">
            {name}
          </Text>
          <div className="pv-ramp">
            {Object.entries(ramp).map(([step, hex]) => (
              <div key={step} className="pv-ramp__cell">
                <span
                  className="pv-ramp__chip"
                  style={{ backgroundColor: hex }}
                />
                <Text size="2xs" tone="tertiary">
                  {step}
                </Text>
              </div>
            ))}
          </div>
        </Stack>
      ))}
    </Stack>
  );
}

function ThemeToggle() {
  const { theme, toggleTheme } = useInsightureTheme();
  return (
    <Button variant="outline" size="sm" onClick={toggleTheme}>
      {theme === 'light' ? 'Dark theme' : 'Light theme'}
    </Button>
  );
}

function Showcase() {
  const [modalOpen, setModalOpen] = useState(false);
  const [plan, setPlan] = useState('growth');
  const [notify, setNotify] = useState(true);

  return (
    <div className="pv-page">
      <header className="pv-header">
        <Stack direction="row" justify="between" align="center" gap="md" wrap>
          <Stack gap="3xs">
            <Text size="xs" caps tone="accent">
              Insighture
            </Text>
            <Heading level={1} size="lg">
              Design System
            </Heading>
          </Stack>
          <Stack direction="row" gap="xs" align="center">
            <Badge tone="accent" variant="soft">
              v0.1.0
            </Badge>
            <ThemeToggle />
          </Stack>
        </Stack>
      </header>

      <Section
        title="Typography"
        description="DM Sans throughout, semibold headings, and DM Serif Display italic for the accent words."
      >
        <Stack gap="sm">
          <Heading level={1} size="display">
            We own the problem, not just <em>the solution.</em>
          </Heading>
          <Heading level={2} size="lg">
            Tracking tightens as the type grows
          </Heading>
          <Heading level={3} size="sm">
            Semibold for labels, tables and slides
          </Heading>
          <Text relaxed>
            Body copy is DM Sans at 16px with a 1.5 line height. It stays legible
            on the white page and on the dark teal ground, and the type scale
            steps in ratios that hold up at both ends.
          </Text>
          <Stack direction="row" gap="md" wrap align="center">
            <Text size="sm" tone="secondary">
              Secondary
            </Text>
            <Text size="sm" tone="tertiary">
              Tertiary
            </Text>
            <Text size="sm" tone="accent" weight="medium">
              Accent
            </Text>
            <Text size="xs" caps tone="tertiary">
              Eyebrow label
            </Text>
            <Link href="#typography">A default link</Link>
            <Link href="https://insighture.com" external>
              External
            </Link>
          </Stack>
        </Stack>
      </Section>

      <Section title="Colour" description="Four main colours, four alts. Rose, teal and the alts sit at step 500; dark teal is deep-900; white and black are neutral 0 and 950.">
        <Swatches />
      </Section>

      <Section title="Buttons">
        <Stack gap="md">
          <Stack direction="row" gap="xs" wrap align="center">
            <Button variant="primary">Primary</Button>
            <Button variant="emphasis">Emphasis</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">Danger</Button>
            <Button variant="primary" disabled>
              Disabled
            </Button>
            <Button variant="primary" loading>
              Loading
            </Button>
          </Stack>
          <Stack direction="row" gap="xs" wrap align="center">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
            <Button startIcon="→">With icon</Button>
            <IconButton aria-label="Settings" variant="outline">
              ⚙
            </IconButton>
            <IconButton aria-label="Add" variant="primary" round>
              +
            </IconButton>
            <Tooltip content="Tooltips show on hover and on focus">
              <Button variant="ghost">Hover me</Button>
            </Tooltip>
          </Stack>
        </Stack>
      </Section>

      <Section title="Status and labels">
        <Stack gap="md">
          <Stack direction="row" gap="xs" wrap>
            <Badge tone="accent">Accent</Badge>
            <Badge tone="info" dot>
              Info
            </Badge>
            <Badge tone="success" dot>
              Live
            </Badge>
            <Badge tone="warning">Warning</Badge>
            <Badge tone="danger" variant="solid">
              Critical
            </Badge>
            <Badge tone="info" variant="solid">
              Beta
            </Badge>
            <Badge tone="success" variant="solid">
              New
            </Badge>
          </Stack>
          <Stack direction="row" gap="xs" wrap>
            <Tag color="rose" swatch>
              Design
            </Tag>
            <Tag color="teal" swatch>
              Engineering
            </Tag>
            <Tag color="indigo" swatch>
              Research
            </Tag>
            <Tag color="orange" onRemove={() => {}}>
              Removable
            </Tag>
            <Tag color="neutral">Archived</Tag>
          </Stack>
          <Stack direction="row" gap="md" align="center" wrap>
            <Avatar name="Chathushka Perera" status="online" />
            <Avatar name="Insighture" square size="lg" />
            <Avatar size="sm" name="A B" status="busy" />
            <Spinner size="sm" />
            <Progress value={64} label="Migration" showValue />
          </Stack>
        </Stack>
      </Section>

      <Section title="Feedback">
        <Stack gap="sm">
          <Alert tone="info" title="Heads up">
            The nightly sync completed with two skipped records.
          </Alert>
          <Alert tone="success" title="Deployed" onDismiss={() => {}}>
            Version 2.4.0 is live in production.
          </Alert>
          <Alert tone="warning" title="Quota at 82%">
            Consider upgrading before the end of the billing period.
          </Alert>
          <Alert
            tone="danger"
            title="Connection lost"
            actions={
              <Button size="sm" variant="danger">
                Retry
              </Button>
            }
          >
            We could not reach the warehouse for the last three attempts.
          </Alert>
          <Alert tone="accent" variant="tinted" title="The loud one">
            <code>variant="tinted"</code> keeps the filled surface — for the
            single alert on a view that must dominate.
          </Alert>
        </Stack>
      </Section>

      <Section title="Forms">
        <div className="pv-grid">
          <Stack gap="md">
            <Input
              label="Work email"
              placeholder="you@insighture.com"
              hint="We only use this for workspace invitations."
              required
            />
            <Input
              label="Budget"
              prefix="$"
              suffix="USD"
              defaultValue="25,000"
            />
            <Input
              label="Workspace slug"
              defaultValue="insighture!"
              error="Slugs can only contain letters, numbers and dashes."
            />
            <Select
              label="Region"
              placeholder="Choose a region"
              defaultValue=""
              options={[
                { label: 'Colombo (ap-south-1)', value: 'cmb' },
                { label: 'Singapore (ap-southeast-1)', value: 'sin' },
                { label: 'Frankfurt (eu-central-1)', value: 'fra' },
              ]}
            />
          </Stack>
          <Stack gap="md">
            <Textarea
              label="Project brief"
              placeholder="What are we building?"
              hint="Markdown is supported."
            />
            <RadioGroup
              label="Plan"
              name="plan"
              value={plan}
              onValueChange={setPlan}
            >
              <Radio value="starter" label="Starter" hint="Up to 3 seats" />
              <Radio value="growth" label="Growth" hint="Up to 25 seats" />
              <Radio value="scale" label="Scale" hint="Unlimited seats" />
            </RadioGroup>
            <Stack gap="xs">
              <Checkbox
                label="Email me weekly insights"
                hint="A digest every Monday morning."
                defaultChecked
              />
              <Checkbox label="Partial selection" indeterminate />
              <Checkbox label="Unavailable option" disabled />
            </Stack>
            <Switch
              label="Product notifications"
              hint="Push alerts for pipeline failures."
              checked={notify}
              onChange={(event) => setNotify(event.target.checked)}
            />
          </Stack>
        </div>
      </Section>

      <Section title="Containers and navigation">
        <Stack gap="lg">
          <div className="pv-grid">
            <Card variant="elevated">
              <CardHeader>
                <Stack gap="3xs">
                  <Heading level={3} size="xs">
                    Pipeline health
                  </Heading>
                  <Text size="xs" tone="tertiary">
                    Last 24 hours
                  </Text>
                </Stack>
                <Badge tone="success" dot>
                  Healthy
                </Badge>
              </CardHeader>
              <CardBody>
                <Text size="sm" tone="secondary">
                  All 14 scheduled jobs completed. Median runtime dropped by 12%
                  after the partition change.
                </Text>
                <Progress value={92} tone="success" label="Success rate" showValue />
              </CardBody>
              <CardFooter>
                <Button variant="ghost" size="sm">
                  Dismiss
                </Button>
                <Button size="sm">View report</Button>
              </CardFooter>
            </Card>

            <Card variant="accent">
              <CardBody>
                <Text size="xs" caps tone="accent">
                  Featured
                </Text>
                <Heading level={3} size="sm">
                  Insight, delivered weekly
                </Heading>
                <Text size="sm" tone="secondary">
                  The accent card is the one surface that should pull focus on a
                  page. Use it sparingly.
                </Text>
              </CardBody>
              <CardFooter>
                <Button size="sm" onClick={() => setModalOpen(true)}>
                  Open dialog
                </Button>
              </CardFooter>
            </Card>
          </div>

          <Divider label="Tabs" />

          <Tabs
            items={[
              {
                id: 'overview',
                label: 'Overview',
                content: (
                  <Text size="sm" tone="secondary">
                    Underline tabs suit page-level navigation.
                  </Text>
                ),
              },
              {
                id: 'activity',
                label: 'Activity',
                badge: 12,
                content: (
                  <Text size="sm" tone="secondary">
                    Badges carry counts without breaking the tab rhythm.
                  </Text>
                ),
              },
              {
                id: 'settings',
                label: 'Settings',
                content: (
                  <Text size="sm" tone="secondary">
                    Arrow keys move between tabs; Home and End jump to the ends.
                  </Text>
                ),
              },
              { id: 'billing', label: 'Billing', disabled: true },
            ]}
          />

          <Tabs
            variant="pill"
            fitted
            items={[
              { id: 'day', label: 'Day' },
              { id: 'week', label: 'Week' },
              { id: 'month', label: 'Month' },
            ]}
            defaultValue="week"
          />
        </Stack>
      </Section>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Publish this workspace?"
        description="Everyone in your organisation will get access immediately."
        footer={
          <>
            <Button variant="ghost" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setModalOpen(false)}>Publish</Button>
          </>
        }
      >
        <Text size="sm" tone="secondary">
          Publishing shares every dashboard in this workspace. You can revoke
          access at any time from settings.
        </Text>
      </Modal>

      <footer className="pv-footer">
        <Text size="xs" tone="tertiary">
          Insighture Design System · DM Sans + DM Serif Display
        </Text>
      </footer>
    </div>
  );
}

export function App() {
  const [theme, setTheme] = useState<InsightureTheme>('light');
  return (
    <InsightureProvider theme={theme} onThemeChange={setTheme}>
      <Showcase />
    </InsightureProvider>
  );
}
