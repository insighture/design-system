import { Radio, RadioGroup } from '@insighture/design-system';

export const InAGroup = () => (
  <RadioGroup label="Plan" name="preview-plan" defaultValue="growth">
    <Radio value="starter" label="Starter" hint="Up to 3 seats" />
    <Radio value="growth" label="Growth" hint="Up to 25 seats" />
    <Radio value="scale" label="Scale" hint="Unlimited seats" />
  </RadioGroup>
);

export const WithoutHints = () => (
  <RadioGroup label="Billing period" name="preview-period" defaultValue="year">
    <Radio value="month" label="Monthly" />
    <Radio value="year" label="Yearly" />
  </RadioGroup>
);

export const Disabled = () => (
  <RadioGroup label="Region" name="preview-region" defaultValue="cmb">
    <Radio value="cmb" label="Colombo" />
    <Radio value="fra" label="Frankfurt" hint="Not on your plan" disabled />
  </RadioGroup>
);
