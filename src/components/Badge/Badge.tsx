import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils/cx';

export type BadgeTone =
  | 'neutral'
  | 'accent'
  | 'info'
  | 'success'
  | 'warning'
  | 'danger'
  | 'highlight'
  | 'emphasis';
export type BadgeVariant = 'soft' | 'solid' | 'outline';
export type BadgeSize = 'sm' | 'md';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * Semantic status. Colours the `dot` only — the surface and the label are
   * always neutral, so badges never read as coloured pills. Pair with `dot`,
   * or the tone has nothing to show.
   */
  tone?: BadgeTone;
  variant?: BadgeVariant;
  size?: BadgeSize;
  /** Leading status dot — the only colour a badge carries. */
  dot?: boolean;
  children?: ReactNode;
}

export function Badge({
  tone = 'neutral',
  variant = 'soft',
  size = 'md',
  dot = false,
  className,
  children,
  ...rest
}: BadgeProps) {
  return (
    <span
      {...rest}
      className={cx(
        'ins-badge',
        `ins-badge--${variant}`,
        `ins-badge--tone-${tone}`,
        `ins-badge--${size}`,
        className,
      )}
    >
      {dot && <span className="ins-badge__dot" aria-hidden="true" />}
      {children}
    </span>
  );
}
