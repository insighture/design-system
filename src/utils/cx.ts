export type ClassValue =
  | string
  | number
  | null
  | undefined
  | false
  | ClassValue[]
  | Record<string, boolean | null | undefined>;

/** Tiny class-name joiner. Falsy entries drop out; arrays and maps flatten. */
export function cx(...values: ClassValue[]): string {
  const out: string[] = [];
  for (const value of values) {
    if (!value) continue;
    if (typeof value === 'string' || typeof value === 'number') {
      out.push(String(value));
    } else if (Array.isArray(value)) {
      const nested = cx(...value);
      if (nested) out.push(nested);
    } else {
      for (const key of Object.keys(value)) {
        if (value[key]) out.push(key);
      }
    }
  }
  return out.join(' ');
}
