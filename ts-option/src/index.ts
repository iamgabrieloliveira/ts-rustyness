import { NoneUnwrapped } from "./exceptions/none-unwrapped-exception";

type MatchStatement<T, R> = {
  some: (value: T) => R;
  none: () => R;
}

export class Option<T = never> {

  constructor(private value : T | null = null) {}

  isSome() : boolean {
    return this.value !== null;
  } 
  
  isNone() : boolean {
    return this.value === null;
  } 
  
  unwrap() : T {
    if (this.value === null) {
      throw new NoneUnwrapped();
    }

    return this.value;
  }

  unwrapOr(fallback : T) : T {
    if (this.value === null) {
      return fallback;
    }

    return this.value;
  }

  expect(message : string) : T {
    if (this.value === null) {
      throw new NoneUnwrapped(message);
    }

    return this.value;
  }

  isSomeAnd(callback : (value : T) => boolean) : boolean {
    return this.value !== null && callback(this.value);
  }
  
  map<M>(callback : (value : T) => M) : Option<M> {
    if (this.value === null) {
      return none;
    }

    return some(callback(this.value));
  }

  mapOr<M>(callback : (value : T) => M, fallback : M) : M {
    if (this.value === null) {
      return fallback;
    }

    return callback(this.value);
  }

  match<R>(statement : MatchStatement<T, R>)
  {
    if (this.value === null) {
      return statement.none();
    }

    return statement.some(this.value);
  }
}

export const some = <T>(value: T) => new Option(value);
export const none = new Option();

