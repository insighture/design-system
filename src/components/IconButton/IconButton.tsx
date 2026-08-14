import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import type { ButtonSize, ButtonVariant } from '../Button/Button';

export interface IconButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /** Required — icon-only controls have no visible text to announce. */
  'aria-label': string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Circular instead of rounded-square. */
  round?: boolean;
  children: ReactNode;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButton(
    { variant = 'ghost', size = 'md', round = false, className, children, type = 'button', ...rest },
    ref,
  ) {
    return (
      <button
        {...rest}
        ref={ref}
        type={type}
        className={cx(
          'ins-button',
          `ins-button--${variant}`,
          'ins-icon-button',
          `ins-icon-button--${size}`,
          round && 'ins-icon-button--round',
          className,
        )}
      >
        {children}
      </button>
    );
  },
);
