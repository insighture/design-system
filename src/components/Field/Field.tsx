import type { ReactNode } from 'react';
import { cx } from '../../utils/cx';

export interface FieldShellProps {
  id: string;
  label?: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
  required?: boolean;
  className?: string;
  children: ReactNode;
}

/**
 * Shared label / hint / error scaffolding for form controls. Not exported from
 * the package root — Input, Textarea, Select and friends compose it so every
 * control gets identical spacing and identical a11y wiring.
 */
export function FieldShell({
  id,
  label,
  hint,
  error,
  required,
  className,
  children,
}: FieldShellProps) {
  return (
    <div className={cx('ins-field', error && 'ins-field--invalid', className)}>
      {label && (
        <label className="ins-field__label" htmlFor={id}>
          {label}
          {required && (
            <span className="ins-field__required" aria-hidden="true">
              *
            </span>
          )}
        </label>
      )}
      {children}
      {hint && !error && (
        <p className="ins-field__hint" id={`${id}-hint`}>
          {hint}
        </p>
      )}
      {error && (
        <p className="ins-field__error" id={`${id}-error`}>
          {error}
        </p>
      )}
    </div>
  );
}

/** Builds the `aria-describedby` value for a control from what it renders. */
export function describedBy(
  id: string,
  hint: unknown,
  error: unknown,
): string | undefined {
  if (error) return `${id}-error`;
  if (hint) return `${id}-hint`;
  return undefined;
}
