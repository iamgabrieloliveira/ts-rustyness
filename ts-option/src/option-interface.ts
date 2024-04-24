import type { Option } from './index.ts';

export type MatchStatement<T, R> = {
  some: (value: T) => R,
  none: () => R,
}

export interface OptionInterface<T> {
  isNone(): boolean;
  isSome(): boolean;
  isSomeAnd(callback: (v: T) => boolean): boolean;
  unwrap(): T;
  unwrapOr(value: T): T;
  expect(message: string): T;
  map(callback: (v: T) => T): Option<T>;
  mapOr(callback: (v: T) => T, fallback: T): T;
  match<R>(data: MatchStatement<T, R>): R;
}


