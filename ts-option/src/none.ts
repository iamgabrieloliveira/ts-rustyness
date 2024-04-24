import type { OptionInterface, MatchStatement } from './option-interface.ts';
import { NoneUnwrapped } from './exceptions/none-unwrapped-exception.ts';

export class None implements OptionInterface<unknown> {
  isNone(): boolean {
    return true;
  }

  isSome(): boolean {
    return false;
  }

  unwrap(): never {
    throw new NoneUnwrapped();
  }

  unwrapOr(value: unknown): unknown {
    return value;
  }

  expect(message: string): never {
    throw new NoneUnwrapped(message);
  }

  isSomeAnd(_: (v: never) => boolean): boolean {
    return false;
  }

  map<T>(_: (v: T) => T): None {
    return new None();
  }

  mapOr<T>(_: (v: T) => T, fallback: T): T {
    return fallback;
  }

  match<R>({ none }: MatchStatement<never, R>): R {
    return none();
  }
}
