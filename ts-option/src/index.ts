import { None } from './none';
import { Some } from './some';

export type Option<T> = None | Some<T>;

export const some = <T>(value: T) => new Some(value);
export const none = new None();
