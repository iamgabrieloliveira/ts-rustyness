import { some, none } from '../../ts-option/src';
import { list } from '../src';

it('~find', () => {
  const arr = [1, 2, 3, 4, 5];
  
  expect(list.find(arr, (item: number) => item > 10))
    .toStrictEqual(none);

  expect(list.find(arr, (item: number) => item < 5))
    .toStrictEqual(some(1));
});

it('~pop', () => {
  const arr = [1, 2];
  
  expect(
    list.pop(arr)
  ).toStrictEqual(some(2));

  expect(
    list.pop(arr)
  ).toStrictEqual(some(1));

  expect(
    list.pop(arr)
  ).toStrictEqual(none);
});
