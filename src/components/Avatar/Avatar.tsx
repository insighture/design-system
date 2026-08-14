import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils/cx';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface AvatarProps extends HTMLAttributes<HTMLSpanElement> {
  /** Image URL. Falls back to initials, then to the placeholder glyph. */
  src?: string;
  /** Full name — used for the image alt text and to derive initials. */
  name?: string;
  size?: AvatarSize;
  /** Square with rounded corners instead of a circle — for org/product avatars. */
  square?: boolean;
  /** Presence ring: online, away, busy, or offline. */
  status?: 'online' | 'away' | 'busy' | 'offline';
  children?: ReactNode;
}

function initialsFrom(name?: string): string {
  if (!name) return '';
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '';
  if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase();
  return (parts[0]![0]! + parts[parts.length - 1]![0]!).toUpperCase();
}

export function Avatar({
  src,
  name,
  size = 'md',
  square = false,
  status,
  className,
  children,
  ...rest
}: AvatarProps) {
  const initials = initialsFrom(name);
  return (
    <span
      {...rest}
      className={cx(
        'ins-avatar',
        `ins-avatar--${size}`,
        square && 'ins-avatar--square',
        className,
      )}
    >
      {src ? (
        <img className="ins-avatar__image" src={src} alt={name ?? ''} />
      ) : (
        <span className="ins-avatar__fallback" aria-hidden={!name}>
          {children ?? initials ?? ''}
        </span>
      )}
      {status && (
        <span
          className={cx('ins-avatar__status', `ins-avatar__status--${status}`)}
          aria-label={status}
          role="img"
        />
      )}
    </span>
  );
}
