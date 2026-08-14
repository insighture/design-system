import { Radio, RadioGroup, Stack } from '@insighture/design-system';

export const Vertical = () => (
  <RadioGroup
    label="Plan"
    name="rg-plan"
    defaultValue="growth"
    hint="You can change this at any time."
  >
    <Radio value="starter" label="Starter" hint="Up to 3 seats" />
    <Radio value="growth" label="Growth" hint="Up to 25 seats" />
    <Radio value="scale" label="Scale" hint="Unlimited seats" />
  </RadioGroup>
);

export const Horizontal = () => (
  <RadioGroup label="Billing period" name="rg-period" defaultValue="year" horizontal>
    <Radio value="month" label="Monthly" />
    <Radio value="year" label="Yearly" />
  </RadioGroup>
);

export const Invalid = () => (
  <Stack gap="md">
    <RadioGroup
      label="Plan"
      name="rg-invalid"
      error="Choose a plan to continue."
    >
      <Radio value="starter" label="Starter" />
      <Radio value="growth" label="Growth" />
    </RadioGroup>
  </Stack>
);
