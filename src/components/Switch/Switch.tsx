import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { useIdOr } from '../../utils/useId';

export interface SwitchProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: ReactNode;
  hint?: ReactNode;
  size?: 'sm' | 'md';
  /** Put the label before the track — common in settings rows. */
  labelPosition?: 'start' | 'end';
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(function Switch(
  { label, hint, size = 'md', labelPosition = 'end', id, className, ...rest },
  ref,
) {
  const fieldId = useIdOr(id);
  const text = (
    <div className="ins-switch__text">
      {label && (
        <label className="ins-switch__label" htmlFor={fieldId}>
          {label}
        </label>
      )}
      {hint && (
        <p className="ins-switch__hint" id={`${fieldId}-hint`}>
          {hint}
        </p>
      )}
    </div>
  );

  return (
    <div
      className={cx(
        'ins-switch',
        `ins-switch--${size}`,
        labelPosition === 'start' && 'ins-switch--label-start',
        rest.disabled && 'ins-switch--disabled',
        className,
      )}
    >
      {labelPosition === 'start' && text}
      <span className="ins-switch__control">
        <input
          {...rest}
          ref={ref}
          type="checkbox"
          role="switch"
          id={fieldId}
          aria-describedby={hint ? `${fieldId}-hint` : undefined}
          className="ins-switch__input"
        />
        <span className="ins-switch__track" aria-hidden="true">
          <span className="ins-switch__thumb" />
        </span>
      </span>
      {labelPosition === 'end' && text}
    </div>
  );
});
