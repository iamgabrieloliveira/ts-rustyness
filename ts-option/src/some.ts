import type { OptionInterface, MatchStatement } from './option-interface.ts';
import type { Option } from './index.ts';

export class Some<T> implements OptionInterface<T> {
  constructor(private value: T) { }

  isNone(): boolean {
    return false;
  }

  isSome(): boolean {
    return true;
  }

  unwrap(): T {
    return this.value;
  }

  unwrapOr(_: T): T {
    return this.value;
  }

  expect(_: string): T {
    return this.value;
  }

  isSomeAnd(callback: (v: T) => boolean): boolean {
    return callback(this.value);
  }

  map(callback: (v: T) => T): Option<T> {
    return new Some(callback(this.value));
  }

  mapOr(callback: (v: T) => T, _: T): T {
    return callback(this.value);
  }

  match<R>({ some }: MatchStatement<T, R>): R {
    return some(this.value);
  }
}
