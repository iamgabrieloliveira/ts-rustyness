import { some, none } from "../src";
import { NoneUnwraped } from '../src/exceptions/none-unwraped-exception';

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
  expect(() => none.unwrap()).toThrow(NoneUnwraped);
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
    () => none.expect('number must be greather than 10')
  ).toThrow('number must be greather than 10');

  expect(some(11).expect('number must be greather than 10')).toBe(11);
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

