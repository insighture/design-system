import { useState, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { useIdOr } from '../../utils/useId';

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps {
  /** The tip text. Keep it short — this is a hint, not documentation. */
  content: ReactNode;
  placement?: TooltipPlacement;
  /**
   * Start visible. Useful for onboarding hints and for documentation previews —
   * the tip still hides on mouse-out, blur or Escape like any other.
   */
  defaultOpen?: boolean;
  /** The trigger. Must be a single focusable element for keyboard support. */
  children: ReactNode;
  className?: string;
}

/**
 * CSS-positioned tooltip: shows on hover and on keyboard focus, hides on Escape.
 * It positions relative to the trigger, so keep the trigger inside a container
 * that does not clip overflow.
 */
export function Tooltip({
  content,
  placement = 'top',
  defaultOpen = false,
  children,
  className,
}: TooltipProps) {
  const id = useIdOr();
  const [open, setOpen] = useState(defaultOpen);

  return (
    <span
      className={cx('ins-tooltip', className)}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
      onKeyDown={(event) => {
        if (event.key === 'Escape') setOpen(false);
      }}
    >
      <span className="ins-tooltip__trigger" aria-describedby={id}>
        {children}
      </span>
      <span
        id={id}
        role="tooltip"
        className={cx(
          'ins-tooltip__bubble',
          `ins-tooltip__bubble--${placement}`,
          open && 'ins-tooltip__bubble--open',
        )}
      >
        {content}
      </span>
    </span>
  );
}
