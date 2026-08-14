import { useEffect, useRef, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { useIdOr } from '../../utils/useId';

export type ModalSize = 'sm' | 'md' | 'lg';

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: ReactNode;
  /** Sub-heading under the title. */
  description?: ReactNode;
  size?: ModalSize;
  /** Action row pinned to the bottom of the dialog. */
  footer?: ReactNode;
  /** Clicking the scrim closes the modal. Turn off for destructive flows. */
  closeOnOverlayClick?: boolean;
  /** Hide the corner close button — pair with an explicit footer action. */
  hideCloseButton?: boolean;
  className?: string;
  children?: ReactNode;
}

/**
 * Modal dialog rendered in place (no portal), so mount it near the root of the
 * provider. Escape closes it, focus moves into the dialog on open and returns to
 * the previously focused element on close, and body scroll is locked while open.
 */
export function Modal({
  open,
  onClose,
  title,
  description,
  size = 'md',
  footer,
  closeOnOverlayClick = true,
  hideCloseButton = false,
  className,
  children,
}: ModalProps) {
  const id = useIdOr();
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;

    restoreFocusRef.current = document.activeElement as HTMLElement | null;
    dialogRef.current?.focus();

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key !== 'Tab') return;

      // Focus trap: cycle within the dialog's focusable elements.
      const focusables = dialogRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
      );
      if (!focusables || focusables.length === 0) return;
      const first = focusables[0]!;
      const last = focusables[focusables.length - 1]!;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
      restoreFocusRef.current?.focus?.();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="ins-modal__overlay"
      onMouseDown={(event) => {
        if (closeOnOverlayClick && event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? `${id}-title` : undefined}
        aria-describedby={description ? `${id}-description` : undefined}
        tabIndex={-1}
        className={cx('ins-modal', `ins-modal--${size}`, className)}
      >
        {(title || !hideCloseButton) && (
          <div className="ins-modal__header">
            <div className="ins-modal__heading">
              {title && (
                <h2 className="ins-modal__title" id={`${id}-title`}>
                  {title}
                </h2>
              )}
              {description && (
                <p className="ins-modal__description" id={`${id}-description`}>
                  {description}
                </p>
              )}
            </div>
            {!hideCloseButton && (
              <button
                type="button"
                className="ins-modal__close"
                onClick={onClose}
                aria-label="Close dialog"
              >
                ×
              </button>
            )}
          </div>
        )}
        <div className="ins-modal__body">{children}</div>
        {footer && <div className="ins-modal__footer">{footer}</div>}
      </div>
    </div>
  );
}
