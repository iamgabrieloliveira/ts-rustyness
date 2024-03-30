import { some, none, type Option } from '../../option';

class List {
  find<T>(arr: T[], callback: (value: T, index: number) => boolean): Option<T> {
    const value = arr.find(callback);

    if (value === undefined) return none;

    return some(value);
  }

  pop<T>(arr: T[]): Option<T> {
    const value = arr.pop();

    if (value === undefined) return none;

    return some(value);
  }
}

export const list = new List();  
