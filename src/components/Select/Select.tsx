import { forwardRef, type ReactNode, type SelectHTMLAttributes } from 'react';
import { cx } from '../../utils/cx';
import { useIdOr } from '../../utils/useId';
import { FieldShell, describedBy } from '../Field/Field';

export interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface SelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size' | 'children'> {
  label?: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
  size?: 'sm' | 'md' | 'lg';
  /** Options to render. Pass `children` instead for optgroups. */
  options?: SelectOption[];
  /** Non-selectable first entry shown when the value is empty. */
  placeholder?: string;
  children?: ReactNode;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  {
    label,
    hint,
    error,
    size = 'md',
    options,
    placeholder,
    id,
    className,
    required,
    children,
    ...rest
  },
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
      <div className="ins-select">
        <select
          {...rest}
          ref={ref}
          id={fieldId}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy(fieldId, hint, error)}
          className={cx(
            'ins-control',
            `ins-control--${size}`,
            'ins-select__control',
            className,
          )}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options?.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
          {children}
        </select>
        <span className="ins-select__chevron" aria-hidden="true" />
      </div>
    </FieldShell>
  );
});
