import {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  type InputHTMLAttributes,
  type ReactElement,
  type ReactNode,
} from 'react';
import { cx } from '../../utils/cx';
import { useIdOr } from '../../utils/useId';

export interface RadioProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: ReactNode;
  hint?: ReactNode;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio(
  { label, hint, id, className, ...rest },
  ref,
) {
  const fieldId = useIdOr(id);
  return (
    <div
      className={cx(
        'ins-choice',
        rest.disabled && 'ins-choice--disabled',
        className,
      )}
    >
      <input
        {...rest}
        ref={ref}
        type="radio"
        id={fieldId}
        aria-describedby={hint ? `${fieldId}-hint` : undefined}
        className="ins-choice__input ins-choice__input--radio"
      />
      <div className="ins-choice__text">
        {label && (
          <label className="ins-choice__label" htmlFor={fieldId}>
            {label}
          </label>
        )}
        {hint && (
          <p className="ins-choice__hint" id={`${fieldId}-hint`}>
            {hint}
          </p>
        )}
      </div>
    </div>
  );
});

export interface RadioGroupProps {
  /** Rendered as the group's `<legend>` and announced with each option. */
  label?: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
  /** Shared `name` applied to every child Radio. */
  name: string;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  /** Lay the options out in a row instead of a column. */
  horizontal?: boolean;
  className?: string;
  children?: ReactNode;
}

/**
 * Groups Radios under a shared name and fieldset. Children stay plain `Radio`
 * elements; the group wires `name` and change handling through the DOM event.
 */
export function RadioGroup({
  label,
  hint,
  error,
  name,
  value,
  defaultValue,
  onValueChange,
  horizontal = false,
  className,
  children,
}: RadioGroupProps) {
  return (
    <fieldset
      className={cx('ins-radio-group', error && 'ins-field--invalid', className)}
      onChange={(event) => {
        const target = event.target as HTMLInputElement;
        if (target.name === name) onValueChange?.(target.value);
      }}
    >
      {label && <legend className="ins-radio-group__legend">{label}</legend>}
      <div
        className={cx(
          'ins-radio-group__options',
          horizontal && 'ins-radio-group__options--row',
        )}
      >
        {mapRadios(children, name, value, defaultValue)}
      </div>
      {hint && !error && <p className="ins-field__hint">{hint}</p>}
      {error && <p className="ins-field__error">{error}</p>}
    </fieldset>
  );
}

function mapRadios(
  children: ReactNode,
  name: string,
  value?: string,
  defaultValue?: string,
): ReactNode {
  // Children are cloned only to inject `name` plus the controlled/uncontrolled
  // checked state, so consumers write <Radio value="a" label="A" /> and nothing
  // else. Anything that is not an element passes through untouched.
  return Children.map(children, (child) => {
    if (!isValidElement(child)) return child;
    const props = child.props as RadioProps;
    const optionValue = props.value as string | undefined;
    return cloneElement(child as ReactElement<RadioProps>, {
      name,
      ...(value !== undefined
        ? {
            checked: value === optionValue,
            // The group listens for the bubbled change on the fieldset; this
            // no-op only keeps React from flagging an uncontrolled input.
            onChange: props.onChange ?? (() => {}),
          }
        : {}),
      ...(value === undefined && defaultValue !== undefined
        ? { defaultChecked: defaultValue === optionValue }
        : {}),
    });
  });
}
