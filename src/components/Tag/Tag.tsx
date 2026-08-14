import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils/cx';

export type TagColor =
  | 'neutral'
  | 'azure'
  | 'coral'
  | 'amber'
  | 'yellow'
  | 'green';

export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * Category colour, named after the brand palette. It tints the `swatch` only
   * — the chip itself stays neutral.
   */
  color?: TagColor;
  /** Renders a remove control and calls back when it is pressed. */
  onRemove?: () => void;
  /** Small colour swatch before the label — where the category colour lives. */
  swatch?: boolean;
  children?: ReactNode;
}

export function Tag({
  color = 'neutral',
  onRemove,
  swatch = false,
  className,
  children,
  ...rest
}: TagProps) {
  return (
    <span
      {...rest}
      className={cx('ins-tag', `ins-tag--${color}`, className)}
    >
      {swatch && <span className="ins-tag__swatch" aria-hidden="true" />}
      <span className="ins-tag__label">{children}</span>
      {onRemove && (
        <button
          type="button"
          className="ins-tag__remove"
          onClick={onRemove}
          aria-label={
            typeof children === 'string' ? `Remove ${children}` : 'Remove'
          }
        >
          ×
        </button>
      )}
    </span>
  );
}
