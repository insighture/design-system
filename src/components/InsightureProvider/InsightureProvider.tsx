import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { cx } from '../../utils/cx';

export type InsightureTheme = 'light' | 'dark';

export interface InsightureContextValue {
  /** Currently applied theme. */
  theme: InsightureTheme;
  /** Switch themes. No-op when the provider is running in controlled mode. */
  setTheme: (theme: InsightureTheme) => void;
  /** Convenience toggle between light and dark. */
  toggleTheme: () => void;
}

const InsightureContext = createContext<InsightureContextValue | null>(null);

export interface InsightureProviderProps {
  children?: ReactNode;
  /** Controlled theme. Pass with no `onThemeChange` to pin the theme. */
  theme?: InsightureTheme;
  /** Initial theme in uncontrolled mode. Defaults to `"light"`. */
  defaultTheme?: InsightureTheme;
  /** Fires whenever the theme changes, in both controlled and uncontrolled mode. */
  onThemeChange?: (theme: InsightureTheme) => void;
  /**
   * Paint the canvas background and stretch to the viewport. Turn off when
   * mounting the design system inside a host page that owns the background.
   */
  fullBleed?: boolean;
  className?: string;
  /** Render as a different element, e.g. `"body"` wrappers or `"main"`. */
  as?: 'div' | 'main' | 'section';
}

/**
 * Root of every Insighture surface. It carries the theme attribute the token
 * layer keys off, so components rendered outside a provider are unstyled.
 */
export function InsightureProvider({
  children,
  theme: controlledTheme,
  defaultTheme = 'light',
  onThemeChange,
  fullBleed = true,
  className,
  as: Component = 'div',
}: InsightureProviderProps) {
  const [uncontrolled, setUncontrolled] = useState<InsightureTheme>(defaultTheme);
  const isControlled = controlledTheme !== undefined;
  const theme = isControlled ? controlledTheme : uncontrolled;

  const setTheme = useCallback(
    (next: InsightureTheme) => {
      if (!isControlled) setUncontrolled(next);
      onThemeChange?.(next);
    },
    [isControlled, onThemeChange],
  );

  const value = useMemo<InsightureContextValue>(
    () => ({
      theme,
      setTheme,
      toggleTheme: () => setTheme(theme === 'light' ? 'dark' : 'light'),
    }),
    [theme, setTheme],
  );

  return (
    <InsightureContext.Provider value={value}>
      <Component
        className={cx('ins-root', fullBleed && 'ins-root--full-bleed', className)}
        data-ins-theme={theme}
      >
        {children}
      </Component>
    </InsightureContext.Provider>
  );
}

/** Read the active theme. Throws outside an `InsightureProvider`. */
export function useInsightureTheme(): InsightureContextValue {
  const ctx = useContext(InsightureContext);
  if (!ctx) {
    throw new Error(
      'useInsightureTheme must be used inside an <InsightureProvider>.',
    );
  }
  return ctx;
}
