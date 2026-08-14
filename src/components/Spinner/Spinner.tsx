import type { HTMLAttributes } from 'react';
import { cx } from '../../utils/cx';

export type SpinnerSize = 'xs' | 'sm' | 'md' | 'lg';
export type SpinnerTone = 'accent' | 'neutral' | 'current';

export interface SpinnerProps extends HTMLAttributes<HTMLSpanElement> {
  size?: SpinnerSize;
  /** `current` inherits the surrounding text colour — used inside buttons. */
  tone?: SpinnerTone;
  /** Announced to screen readers. Pass `null` when a parent already labels it. */
  label?: string | null;
}

export function Spinner({
  size = 'md',
  tone = 'accent',
  label = 'Loading',
  className,
  ...rest
}: SpinnerProps) {
  return (
    <span
      {...rest}
      role={label ? 'status' : undefined}
      className={cx(
        'ins-spinner',
        `ins-spinner--${size}`,
        `ins-spinner--${tone}`,
        className,
      )}
    >
      <span className="ins-spinner__ring" aria-hidden="true" />
      {label && <span className="ins-visually-hidden">{label}</span>}
    </span>
  );
}
