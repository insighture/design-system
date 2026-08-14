import { forwardRef, type ReactNode, type TextareaHTMLAttributes } from 'react';
import { cx } from '../../utils/cx';
import { useIdOr } from '../../utils/useId';
import { FieldShell, describedBy } from '../Field/Field';

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
  /** Let the browser grow the box as the user types. */
  autoGrow?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea(
    { label, hint, error, autoGrow = false, id, rows = 4, className, required, ...rest },
    ref,
  ) {
    const fieldId = useIdOr(id);
    return (
      <FieldShell
        id={fieldId}
        label={label}
        hint={hint}
        error={error}
        required={required}
      >
        <textarea
          {...rest}
          ref={ref}
          id={fieldId}
          rows={rows}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy(fieldId, hint, error)}
          className={cx(
            'ins-control',
            'ins-control--md',
            'ins-textarea',
            autoGrow && 'ins-textarea--auto',
            className,
          )}
        />
      </FieldShell>
    );
  },
);
