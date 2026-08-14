import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils/cx';

export type AlertTone = 'info' | 'success' | 'warning' | 'danger' | 'accent';

/**
 * How much colour the alert carries.
 * - `default` — a neutral card; only the status icon carries colour. The default.
 * - `outline` — neutral surface, the whole border in the tone colour.
 * - `tinted`  — a filled tone-coloured surface. Loud; use for at most one
 *               alert on a view, when it genuinely must dominate.
 */
export type AlertVariant = 'default' | 'outline' | 'tinted';

export interface AlertProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  tone?: AlertTone;
  variant?: AlertVariant;
  title?: ReactNode;
  /** Replaces the default glyph for the tone. */
  icon?: ReactNode;
  /** Renders a dismiss control and calls back when it is pressed. */
  onDismiss?: () => void;
  /** Action row rendered under the message — usually one or two Buttons. */
  actions?: ReactNode;
  children?: ReactNode;
}

const defaultIcons: Record<AlertTone, string> = {
  info: 'i',
  success: '✓',
  warning: '!',
  danger: '!',
  accent: '★',
};

export function Alert({
  tone = 'info',
  variant = 'default',
  title,
  icon,
  onDismiss,
  actions,
  className,
  children,
  ...rest
}: AlertProps) {
  return (
    <div
      {...rest}
      role={tone === 'danger' ? 'alert' : 'status'}
      className={cx(
        'ins-alert',
        `ins-alert--${tone}`,
        variant !== 'default' && `ins-alert--${variant}`,
        className,
      )}
    >
      <span className="ins-alert__icon" aria-hidden="true">
        {icon ?? defaultIcons[tone]}
      </span>
      <div className="ins-alert__content">
        {title && <p className="ins-alert__title">{title}</p>}
        {children && <div className="ins-alert__message">{children}</div>}
        {actions && <div className="ins-alert__actions">{actions}</div>}
      </div>
      {onDismiss && (
        <button
          type="button"
          className="ins-alert__dismiss"
          onClick={onDismiss}
          aria-label="Dismiss"
        >
          ×
        </button>
      )}
    </div>
  );
}
