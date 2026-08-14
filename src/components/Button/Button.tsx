import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { Spinner } from '../Spinner/Spinner';

export type ButtonVariant =
  | 'primary'
  | 'emphasis'
  | 'secondary'
  | 'outline'
  | 'ghost'
  | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Visual weight. `primary` is ink (near-black) — the default action, one per
   * view. `emphasis` is coral orange, louder still, for the single most
   * important action on a marketing or onboarding surface.
   */
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Swaps the label for a spinner and blocks interaction. */
  loading?: boolean;
  /** Stretch to the width of the parent — useful in forms and mobile layouts. */
  fullWidth?: boolean;
  /** Icon rendered before the label. */
  startIcon?: ReactNode;
  /** Icon rendered after the label. */
  endIcon?: ReactNode;
  children?: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      fullWidth = false,
      startIcon,
      endIcon,
      disabled,
      className,
      children,
      type = 'button',
      ...rest
    },
    ref,
  ) {
    return (
      <button
        {...rest}
        ref={ref}
        type={type}
        disabled={disabled || loading}
        aria-busy={loading || undefined}
        className={cx(
          'ins-button',
          `ins-button--${variant}`,
          `ins-button--${size}`,
          fullWidth && 'ins-button--full',
          loading && 'ins-button--loading',
          className,
        )}
      >
        {loading && (
          <span className="ins-button__spinner">
            <Spinner size={size === 'lg' ? 'md' : 'sm'} tone="current" />
          </span>
        )}
        <span className="ins-button__content">
          {startIcon && (
            <span className="ins-button__icon" aria-hidden="true">
              {startIcon}
            </span>
          )}
          {children}
          {endIcon && (
            <span className="ins-button__icon" aria-hidden="true">
              {endIcon}
            </span>
          )}
        </span>
      </button>
    );
  },
);
