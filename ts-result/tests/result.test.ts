import { ok, err } from '../src';

it('~isError', () => {
  expect(err('error-message').isErr()).toBe(true);
  expect(ok('ok').isErr()).toBe(false);
});

it('~isOk', () => {
  expect(ok('ok').isOk()).toBe(true);
  expect(err('error-message').isOk()).toBe(false);
});

it('~isOkAnd', () => {
  expect(ok('ok').isOkAnd(v => v === 'ok')).toBe(true);
  expect(ok('ok').isOkAnd(v => v === 'okay')).toBe(false);

  expect(err('err').isOkAnd(v => v === 'err')).toBe(false);
  expect(err('err').isOkAnd(v => v === 'error')).toBe(false);
});

it('~isErrAnd', () => {
  expect(err('err').isErrAnd(e => e === 'err')).toBe(true);
  expect(err('err').isErrAnd(e => e === 'error')).toBe(false);

  expect(ok('ok').isErrAnd(e => e === 'ok')).toBe(false);
  expect(ok('ok').isErrAnd(e => e === 'okay')).toBe(false);
});
