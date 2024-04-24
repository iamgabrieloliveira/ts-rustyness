import { some, none, type Option } from '../src';
import { NoneUnwrapped } from '../src/exceptions/none-unwrapped-exception';

it('~isSome', () => {
  expect(some('hello')
    .isSome()).toBe(true)
  expect(none.isSome()).toBe(false);
});

it('~isNone', () => {
  expect(none.isNone()).toBe(true);
  expect(some('hello').isNone()).toBe(false);
});

it('~unwrap', () => {
  expect(() => none.unwrap()).toThrow(NoneUnwrapped);
  expect(some('value').unwrap()).toBe('value');
});

it('~unwrapOr', () => {
  expect(
    none.unwrapOr('default-value')
  ).toBe('default-value');

  expect(some('value').unwrapOr('default-value')).toBe('value');
});

it('~expect', () => {
  expect(
    () => none.expect('number must be greater than 10')
  ).toThrow('number must be greater than 10');

  expect(some(11).expect('number must be greater than 10')).toBe(11);
});

it('~isSomeAnd', () => {
  expect(none.isSomeAnd(() => true)).toBe(false);
  expect(none.isSomeAnd(() => false)).toBe(false);

  expect(some(100).isSomeAnd(() => true)).toBe(true);
  expect(some(100).isSomeAnd(() => false)).toBe(false);

  expect(some(100).isSomeAnd((value) => value === 100)).toBe(true);
  expect(some(200).isSomeAnd((value) => value === 100)).toBe(false);
});

it('~map', () => {
  expect(some(100).map((value) => value * 2)).toStrictEqual(some(200));
  expect(none.map<number>((value) => value * 2)).toStrictEqual(none);
});

it('~mapOr', () => {
  expect(some(100).mapOr((value) => value * 2, 999)).toBe(200);
  expect(none.mapOr((value) => value * 2, 999)).toBe(999);
});

it('~match', () => {
  const maybe = (x: number) : Option<number> => x > 10 ? some(x) : none;

  const result1 = maybe(5).match({
    some: () => 'greater',
    none: () => 'less',
  });

  const result2 = maybe(15).match({
    some: (value) => value + 10,
    none: () => 69,
  });

  expect(result1).toBe('less');
  expect(result2).toBe(25);
});

