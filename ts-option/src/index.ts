import { NoneUnwraped } from "./exceptions/none-unwraped-exception";

interface OptionInterface<T> {
  isNone(): boolean;
  isSome(): boolean;
  isSomeAnd(callback: (v: T) => boolean): boolean;
  unwrap(): T;
  unwrapOr(value: T): T;
  expect(message: string): T;
  map(callback: (v: T) => T): Option<T>;
  mapOr(callback: (v: T) => T, fallback: T): T;
}

class Some<T> implements OptionInterface<T> {
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
    return some(callback(this.value));
  }

  mapOr(callback: (v: T) => T, _: T): T {
    return callback(this.value);
  }
}

class None implements OptionInterface<never> {
  isNone(): boolean {
    return true;
  }

  isSome(): boolean {
    return false;
  }

  unwrap(): never {
    throw new NoneUnwraped();
  }

  unwrapOr<T>(value: T): T {
    return value;
  }

  expect(message: string): never {
    throw new NoneUnwraped(message);
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
}

export type Option<T> = Some<T> | None;

export const some = <T>(value: T) => new Some(value);
export const none = new None();
