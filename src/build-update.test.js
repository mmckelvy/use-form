import test from 'ava';

import buildUpdate from './build-update.js';

test('buildUpdate - Case 1', t => {
  const update = [
    {
      path: 'foo.bar[0].baz',
      value: 28
    },
    {
      path: 'fizz.buzz.1.apple',
      value: 96
    },
  ];

  const expected = {
    'foo.bar.0.baz': 28,
    'fizz.buzz.1.apple': 96
  };

  const actual = buildUpdate(update);

  t.deepEqual(actual, expected);
});
