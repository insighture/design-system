import { useCallback, useRef, useState, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { useIdOr } from '../../utils/useId';

export interface TabItem {
  /** Stable key, also used in the generated element ids. */
  id: string;
  label: ReactNode;
  /** Panel content. Only the active panel is mounted. */
  content?: ReactNode;
  disabled?: boolean;
  /** Count or status pill rendered after the label. */
  badge?: ReactNode;
}

export interface TabsProps {
  items: TabItem[];
  /** Controlled active tab id. */
  value?: string;
  /** Initial active tab id in uncontrolled mode. Defaults to the first item. */
  defaultValue?: string;
  onValueChange?: (id: string) => void;
  variant?: 'underline' | 'pill';
  /** Stretch the tab list so tabs share the full width evenly. */
  fitted?: boolean;
  className?: string;
}

/**
 * Keyboard-accessible tabs. Arrow keys move between tabs, Home/End jump to the
 * ends, and disabled tabs are skipped.
 */
export function Tabs({
  items,
  value,
  defaultValue,
  onValueChange,
  variant = 'underline',
  fitted = false,
  className,
}: TabsProps) {
  const baseId = useIdOr();
  const [uncontrolled, setUncontrolled] = useState(
    defaultValue ?? items[0]?.id ?? '',
  );
  const isControlled = value !== undefined;
  const active = isControlled ? value : uncontrolled;
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const select = useCallback(
    (id: string) => {
      if (!isControlled) setUncontrolled(id);
      onValueChange?.(id);
    },
    [isControlled, onValueChange],
  );

  const move = (from: number, delta: number) => {
    const enabled = items.filter((item) => !item.disabled);
    if (enabled.length === 0) return;
    const currentIndex = enabled.findIndex((item) => item.id === items[from]?.id);
    const next =
      enabled[(currentIndex + delta + enabled.length) % enabled.length]!;
    select(next.id);
    tabRefs.current[next.id]?.focus();
  };

  const activeItem = items.find((item) => item.id === active);

  return (
    <div className={cx('ins-tabs', `ins-tabs--${variant}`, className)}>
      <div
        role="tablist"
        className={cx('ins-tabs__list', fitted && 'ins-tabs__list--fitted')}
      >
        {items.map((item, index) => (
          <button
            key={item.id}
            ref={(node) => {
              tabRefs.current[item.id] = node;
            }}
            type="button"
            role="tab"
            id={`${baseId}-tab-${item.id}`}
            aria-selected={item.id === active}
            aria-controls={`${baseId}-panel-${item.id}`}
            tabIndex={item.id === active ? 0 : -1}
            disabled={item.disabled}
            className={cx(
              'ins-tabs__tab',
              item.id === active && 'ins-tabs__tab--active',
            )}
            onClick={() => select(item.id)}
            onKeyDown={(event) => {
              if (event.key === 'ArrowRight') {
                event.preventDefault();
                move(index, 1);
              } else if (event.key === 'ArrowLeft') {
                event.preventDefault();
                move(index, -1);
              } else if (event.key === 'Home') {
                event.preventDefault();
                move(index, -index);
              } else if (event.key === 'End') {
                event.preventDefault();
                move(index, items.length - 1 - index);
              }
            }}
          >
            <span className="ins-tabs__label">{item.label}</span>
            {item.badge !== undefined && (
              <span className="ins-tabs__badge">{item.badge}</span>
            )}
          </button>
        ))}
      </div>
      {activeItem?.content !== undefined && (
        <div
          role="tabpanel"
          id={`${baseId}-panel-${activeItem.id}`}
          aria-labelledby={`${baseId}-tab-${activeItem.id}`}
          className="ins-tabs__panel"
          tabIndex={0}
        >
          {activeItem.content}
        </div>
      )}
    </div>
  );
}
