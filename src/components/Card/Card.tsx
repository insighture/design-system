import type { ElementType, HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils/cx';

export type CardVariant = 'elevated' | 'outlined' | 'filled' | 'accent';
export type CardPadding = 'none' | 'sm' | 'md' | 'lg';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  padding?: CardPadding;
  /** Lift and highlight on hover — use for cards that are whole click targets. */
  interactive?: boolean;
  as?: ElementType;
  children?: ReactNode;
}

export function Card({
  variant = 'elevated',
  padding = 'md',
  interactive = false,
  as: Component = 'div',
  className,
  children,
  ...rest
}: CardProps) {
  return (
    <Component
      {...rest}
      className={cx(
        'ins-card',
        `ins-card--${variant}`,
        `ins-card--pad-${padding}`,
        interactive && 'ins-card--interactive',
        className,
      )}
    >
      {children}
    </Component>
  );
}

export interface CardSectionProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

/** Title row of a card. Separated from the body by a hairline rule. */
export function CardHeader({ className, children, ...rest }: CardSectionProps) {
  return (
    <div {...rest} className={cx('ins-card__header', className)}>
      {children}
    </div>
  );
}

export function CardBody({ className, children, ...rest }: CardSectionProps) {
  return (
    <div {...rest} className={cx('ins-card__body', className)}>
      {children}
    </div>
  );
}

/** Action row of a card. Right-aligns its children by default. */
export function CardFooter({ className, children, ...rest }: CardSectionProps) {
  return (
    <div {...rest} className={cx('ins-card__footer', className)}>
      {children}
    </div>
  );
}
