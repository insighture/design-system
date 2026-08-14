import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { useIdOr } from '../../utils/useId';
import { FieldShell, describedBy } from '../Field/Field';

export type InputSize = 'sm' | 'md' | 'lg';

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix'> {
  label?: ReactNode;
  /** Helper text under the field. Hidden while `error` is set. */
  hint?: ReactNode;
  /** Error message. Its presence also flips the field into the invalid state. */
  error?: ReactNode;
  size?: InputSize;
  /** Static content inside the field's leading edge, e.g. a currency symbol. */
  prefix?: ReactNode;
  /** Static content inside the field's trailing edge, e.g. a unit or icon. */
  suffix?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    label,
    hint,
    error,
    size = 'md',
    prefix,
    suffix,
    id,
    className,
    required,
    ...rest
  },
  ref,
) {
  const fieldId = useIdOr(id);
  const control = (
    <input
      {...rest}
      ref={ref}
      id={fieldId}
      required={required}
      aria-invalid={error ? true : undefined}
      aria-describedby={describedBy(fieldId, hint, error)}
      className={cx('ins-control', `ins-control--${size}`, 'ins-input', className)}
    />
  );

  return (
    <FieldShell
      id={fieldId}
      label={label}
      hint={hint}
      error={error}
      required={required}
    >
      {prefix || suffix ? (
        <div className={cx('ins-input-group', `ins-input-group--${size}`)}>
          {prefix && <span className="ins-input-group__affix">{prefix}</span>}
          {control}
          {suffix && <span className="ins-input-group__affix">{suffix}</span>}
        </div>
      ) : (
        control
      )}
    </FieldShell>
  );
});
