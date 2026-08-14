import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils/cx';

export interface DividerProps extends HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical';
  /** Optional inline label, centred in the rule. Horizontal only. */
  label?: ReactNode;
  /** Lighter rule for dense groupings. */
  subtle?: boolean;
}

export function Divider({
  orientation = 'horizontal',
  label,
  subtle = false,
  className,
  ...rest
}: DividerProps) {
  const classes = cx(
    'ins-divider',
    `ins-divider--${orientation}`,
    subtle && 'ins-divider--subtle',
    label && 'ins-divider--labelled',
    className,
  );

  if (label && orientation === 'horizontal') {
    return (
      <div {...rest} className={classes} role="separator">
        <span className="ins-divider__line" />
        <span className="ins-divider__label">{label}</span>
        <span className="ins-divider__line" />
      </div>
    );
  }

  return (
    <div
      {...rest}
      className={classes}
      role="separator"
      aria-orientation={orientation}
    />
  );
}
