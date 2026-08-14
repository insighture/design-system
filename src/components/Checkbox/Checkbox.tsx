import {
  forwardRef,
  useEffect,
  useRef,
  type InputHTMLAttributes,
  type ReactNode,
} from 'react';
import { cx } from '../../utils/cx';
import { useIdOr } from '../../utils/useId';

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: ReactNode;
  /** Helper text under the label. */
  hint?: ReactNode;
  /** Renders the mixed state used by "select all" rows. */
  indeterminate?: boolean;
  error?: ReactNode;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox(
    { label, hint, error, indeterminate = false, id, className, ...rest },
    ref,
  ) {
    const fieldId = useIdOr(id);
    const innerRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
      if (innerRef.current) innerRef.current.indeterminate = indeterminate;
    }, [indeterminate]);

    return (
      <div
        className={cx(
          'ins-choice',
          error && 'ins-choice--invalid',
          rest.disabled && 'ins-choice--disabled',
          className,
        )}
      >
        <input
          {...rest}
          type="checkbox"
          id={fieldId}
          aria-describedby={hint ? `${fieldId}-hint` : undefined}
          aria-invalid={error ? true : undefined}
          className="ins-choice__input ins-choice__input--checkbox"
          ref={(node) => {
            innerRef.current = node;
            if (typeof ref === 'function') ref(node);
            else if (ref) ref.current = node;
          }}
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
          {error && <p className="ins-choice__error">{error}</p>}
        </div>
      </div>
    );
  },
);
