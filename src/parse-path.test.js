import test from 'ava';

import parsePath from './parse-path.js';

test('parsePath - Case 1', t => {
  const path = 'foo.bar[0]';

  const actual = parsePath(path);
  const expected = ['foo', 'bar', '0'];

  t.deepEqual(actual, expected);
});

test('parsePath - Case 2', t => {
  const path = 'foo.bar.baz';

  const actual = parsePath(path);
  const expected = ['foo', 'bar', 'baz'];

  t.deepEqual(actual, expected);
});

test('parsePath - Case 3', t => {
  const path = 'foo.bar.baz.0';

  const actual = parsePath(path);
  const expected = ['foo', 'bar', 'baz', '0'];

  t.deepEqual(actual, expected);
});

test('parsePath - Case 4', t => {
  const path = 'foo[0].bar.baz';

  const actual = parsePath(path);
  const expected = ['foo', '0', 'bar', 'baz'];

  t.deepEqual(actual, expected);
});
