import { forwardRef, type AnchorHTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../utils/cx';

export type LinkTone = 'default' | 'accent' | 'inherit';

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  tone?: LinkTone;
  /** Show the underline only on hover — for links inside dense navigation. */
  subtle?: boolean;
  /** Adds `target="_blank"` with the matching `rel` and a visual marker. */
  external?: boolean;
  children?: ReactNode;
}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  { tone = 'default', subtle = false, external = false, className, children, ...rest },
  ref,
) {
  return (
    <a
      {...rest}
      ref={ref}
      target={external ? '_blank' : rest.target}
      rel={external ? 'noreferrer noopener' : rest.rel}
      className={cx(
        'ins-link',
        `ins-link--${tone}`,
        subtle && 'ins-link--subtle',
        className,
      )}
    >
      {children}
      {external && (
        <span className="ins-link__external" aria-hidden="true">
          ↗
        </span>
      )}
    </a>
  );
});
