type MatchStatement<T, E, R> = {
  ok: (value: T) => R,
  err: (err: E) => R,
}

export interface ResultInterface<T, E> {
  isOk(): boolean;
  isErr(): boolean;
  isOkAnd(callback: (value: T) => boolean): boolean,
  isErrAnd(callback: (value: E) => boolean): boolean,
  match<R>(data: MatchStatement<T, E, R>): R,
}

export class Ok<T> implements ResultInterface<T, never> {
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

  match<R>({ ok }: MatchStatement<T, never, R>): R {
    return ok(this.value);
  }
}

export class Err<E> implements ResultInterface<never, E> {
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

  match<R>({ err }: MatchStatement<never, E, R>): R {
    return err(this.error);
  }
}

export type Result<T, E> = Ok<T> | Err<E>;

export const ok = <T>(value: T) => new Ok(value);
export const err = <E>(err: E) => new Err(err);


