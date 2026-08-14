import type { ElementType, HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils/cx';

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
export type HeadingSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'display';
export type HeadingTone = 'primary' | 'secondary' | 'accent' | 'inverse';

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  /** Semantic level — drives the rendered tag, not the visual size. */
  level?: HeadingLevel;
  /** Visual size, independent of `level` so document outline stays correct. */
  size?: HeadingSize;
  tone?: HeadingTone;
  /** Balance line lengths on multi-line display headings. */
  balance?: boolean;
  as?: ElementType;
  children?: ReactNode;
}

const defaultSizeForLevel: Record<HeadingLevel, HeadingSize> = {
  1: 'display',
  2: 'xl',
  3: 'lg',
  4: 'md',
  5: 'sm',
  6: 'xs',
};

export function Heading({
  level = 2,
  size,
  tone = 'primary',
  balance = false,
  as,
  className,
  children,
  ...rest
}: HeadingProps) {
  const Component = (as ?? (`h${level}` as ElementType)) as ElementType;
  const resolvedSize = size ?? defaultSizeForLevel[level];
  return (
    <Component
      {...rest}
      className={cx(
        'ins-heading',
        `ins-heading--${resolvedSize}`,
        `ins-heading--tone-${tone}`,
        balance && 'ins-heading--balance',
        className,
      )}
    >
      {children}
    </Component>
  );
}
