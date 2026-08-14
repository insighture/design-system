import type { CSSProperties, ElementType, HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils/cx';

export type StackGap =
  | 'none'
  | '3xs'
  | '2xs'
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl';
export type StackAlign = 'start' | 'center' | 'end' | 'stretch' | 'baseline';
export type StackJustify =
  | 'start'
  | 'center'
  | 'end'
  | 'between'
  | 'around'
  | 'evenly';

export interface StackProps extends HTMLAttributes<HTMLElement> {
  /** `column` (default) stacks vertically; `row` lays out inline. */
  direction?: 'row' | 'column';
  gap?: StackGap;
  align?: StackAlign;
  justify?: StackJustify;
  /** Allow row children to wrap onto new lines. */
  wrap?: boolean;
  /** Collapse a row to a column below the `sm` breakpoint. */
  responsive?: boolean;
  as?: ElementType;
  children?: ReactNode;
}

export function Stack({
  direction = 'column',
  gap = 'md',
  align,
  justify,
  wrap = false,
  responsive = false,
  as: Component = 'div',
  className,
  style,
  children,
  ...rest
}: StackProps) {
  return (
    <Component
      {...rest}
      style={style as CSSProperties}
      className={cx(
        'ins-stack',
        `ins-stack--${direction}`,
        `ins-stack--gap-${gap}`,
        align && `ins-stack--align-${align}`,
        justify && `ins-stack--justify-${justify}`,
        wrap && 'ins-stack--wrap',
        responsive && 'ins-stack--responsive',
        className,
      )}
    >
      {children}
    </Component>
  );
}
