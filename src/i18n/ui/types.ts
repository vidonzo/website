import type { en } from './en';

/**
 * English is authored with `as const` so its arrays keep a known length, but a
 * translation must not be forced to repeat English's *literal strings*. This
 * widens every leaf back to `string` while keeping the shape intact, so a
 * missing key or a renamed section is still a type error in every locale.
 */
type Widen<T> = T extends string
  ? string
  : T extends readonly (infer U)[]
    ? Widen<U>[]
    : T extends object
      ? { -readonly [K in keyof T]: Widen<T[K]> }
      : T;

export type UiStrings = Widen<typeof en>;
