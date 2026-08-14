import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils/cx';

export type ProgressTone = 'accent' | 'info' | 'success' | 'warning' | 'danger';

export interface ProgressProps extends HTMLAttributes<HTMLDivElement> {
  /** 0–`max`. Omit for an indeterminate bar. */
  value?: number;
  max?: number;
  tone?: ProgressTone;
  size?: 'sm' | 'md';
  label?: ReactNode;
  /** Show the numeric percentage beside the label. */
  showValue?: boolean;
}

export function Progress({
  value,
  max = 100,
  tone = 'accent',
  size = 'md',
  label,
  showValue = false,
  className,
  ...rest
}: ProgressProps) {
  const indeterminate = value === undefined;
  const pct = indeterminate
    ? 0
    : Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div {...rest} className={cx('ins-progress', className)}>
      {(label || showValue) && (
        <div className="ins-progress__meta">
          {label && <span className="ins-progress__label">{label}</span>}
          {showValue && !indeterminate && (
            <span className="ins-progress__value">{Math.round(pct)}%</span>
          )}
        </div>
      )}
      <div
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={indeterminate ? undefined : value}
        className={cx(
          'ins-progress__track',
          `ins-progress__track--${size}`,
          `ins-progress__track--${tone}`,
          indeterminate && 'ins-progress__track--indeterminate',
        )}
      >
        <div
          className="ins-progress__bar"
          style={indeterminate ? undefined : { width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
