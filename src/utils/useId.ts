import { useId as useReactId } from 'react';

/**
 * Returns `provided` when the caller supplied an id, otherwise a stable
 * generated one. Used by every labelled control so `htmlFor`/`aria-describedby`
 * wiring works without the consumer having to invent ids.
 */
export function useIdOr(provided?: string): string {
  const generated = useReactId();
  return provided ?? `ins-${generated.replace(/:/g, '')}`;
}
