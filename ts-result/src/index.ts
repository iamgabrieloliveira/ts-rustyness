export interface IResult<T, E> {
  isOk(): boolean;
  isErr(): boolean;
  isOkAnd(callback: (value: T) => boolean): boolean,
  isErrAnd(callback: (value: E) => boolean): boolean,
}

export class Ok<T> implements IResult<T, never> {
  constructor(private value: T) { }

  isOk(): boolean {
    return true;
  }

  isErr(): boolean {
    return false;
  }

  isOkAnd(callback: (value: T) => boolean): boolean {
    return callback(this.value);
  }

  isErrAnd(_: (err: never) => boolean): boolean {
    return false;
  }
}

export class Err<E> implements IResult<never, E> {
  constructor(private error: E) { }

  isOk(): boolean {
    return false;
  }

  isErr(): boolean {
    return true;
  }

  isOkAnd(_: (value: never) => boolean): boolean {
    return false;
  }

  isErrAnd(callback: (value: E) => boolean): boolean {
    return callback(this.error);
  }
}

export type Result<T, E> = Ok<T> | Err<E>;

export const ok = <T>(value: T) => new Ok(value);
export const err = <E>(err: E) => new Err(err);


