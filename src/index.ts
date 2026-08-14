import './styles/index.css';

// Foundations
export {
  InsightureProvider,
  useInsightureTheme,
} from './components/InsightureProvider/InsightureProvider';
export type {
  InsightureProviderProps,
  InsightureContextValue,
  InsightureTheme,
} from './components/InsightureProvider/InsightureProvider';

export * from './tokens';
export { cx } from './utils/cx';

// Layout
export { Stack } from './components/Stack/Stack';
export type {
  StackProps,
  StackAlign,
  StackGap,
  StackJustify,
} from './components/Stack/Stack';

export { Divider } from './components/Divider/Divider';
export type { DividerProps } from './components/Divider/Divider';

// Typography
export { Heading } from './components/Typography/Heading';
export type {
  HeadingProps,
  HeadingLevel,
  HeadingSize,
  HeadingTone,
} from './components/Typography/Heading';

export { Text } from './components/Typography/Text';
export type {
  TextProps,
  TextSize,
  TextTone,
  TextWeight,
} from './components/Typography/Text';

export { Link } from './components/Typography/Link';
export type { LinkProps, LinkTone } from './components/Typography/Link';

// Actions
export { Button } from './components/Button/Button';
export type {
  ButtonProps,
  ButtonSize,
  ButtonVariant,
} from './components/Button/Button';

export { IconButton } from './components/IconButton/IconButton';
export type { IconButtonProps } from './components/IconButton/IconButton';

// Data display
export { Badge } from './components/Badge/Badge';
export type {
  BadgeProps,
  BadgeSize,
  BadgeTone,
  BadgeVariant,
} from './components/Badge/Badge';

export { Tag } from './components/Tag/Tag';
export type { TagProps, TagColor } from './components/Tag/Tag';

export {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from './components/Card/Card';
export type {
  CardProps,
  CardSectionProps,
  CardPadding,
  CardVariant,
} from './components/Card/Card';

export { Avatar } from './components/Avatar/Avatar';
export type { AvatarProps, AvatarSize } from './components/Avatar/Avatar';

// Feedback
export { Alert } from './components/Alert/Alert';
export type {
  AlertProps,
  AlertTone,
  AlertVariant,
} from './components/Alert/Alert';

export { Spinner } from './components/Spinner/Spinner';
export type {
  SpinnerProps,
  SpinnerSize,
  SpinnerTone,
} from './components/Spinner/Spinner';

export { Progress } from './components/Progress/Progress';
export type { ProgressProps, ProgressTone } from './components/Progress/Progress';

// Forms
export { Input } from './components/Input/Input';
export type { InputProps, InputSize } from './components/Input/Input';

export { Textarea } from './components/Textarea/Textarea';
export type { TextareaProps } from './components/Textarea/Textarea';

export { Select } from './components/Select/Select';
export type { SelectProps, SelectOption } from './components/Select/Select';

export { Checkbox } from './components/Checkbox/Checkbox';
export type { CheckboxProps } from './components/Checkbox/Checkbox';

export { Radio, RadioGroup } from './components/Radio/Radio';
export type { RadioProps, RadioGroupProps } from './components/Radio/Radio';

export { Switch } from './components/Switch/Switch';
export type { SwitchProps } from './components/Switch/Switch';

// Navigation & overlays
export { Tabs } from './components/Tabs/Tabs';
export type { TabsProps, TabItem } from './components/Tabs/Tabs';

export { Tooltip } from './components/Tooltip/Tooltip';
export type { TooltipProps, TooltipPlacement } from './components/Tooltip/Tooltip';

export { Modal } from './components/Modal/Modal';
export type { ModalProps, ModalSize } from './components/Modal/Modal';
