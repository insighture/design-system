import type { ElementType, HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils/cx';

export type TextSize = '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type TextTone =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'accent'
  | 'inverse'
  | 'success'
  | 'warning'
  | 'danger';
export type TextWeight = 'regular' | 'medium' | 'semibold' | 'bold';

export interface TextProps extends HTMLAttributes<HTMLElement> {
  size?: TextSize;
  tone?: TextTone;
  weight?: TextWeight;
  /** Uppercase micro-label with tracking — table headers, eyebrow copy. */
  caps?: boolean;
  /** Roomier leading for long-form paragraphs. */
  relaxed?: boolean;
  /** Truncate to a single line with an ellipsis. */
  truncate?: boolean;
  as?: ElementType;
  children?: ReactNode;
}

export function Text({
  size = 'md',
  tone = 'primary',
  weight = 'regular',
  caps = false,
  relaxed = false,
  truncate = false,
  as: Component = 'p',
  className,
  children,
  ...rest
}: TextProps) {
  return (
    <Component
      {...rest}
      className={cx(
        'ins-text',
        `ins-text--${size}`,
        `ins-text--tone-${tone}`,
        `ins-text--weight-${weight}`,
        caps && 'ins-text--caps',
        relaxed && 'ins-text--relaxed',
        truncate && 'ins-text--truncate',
        className,
      )}
    >
      {children}
    </Component>
  );
}
