import test from 'ava';

import buildUpdate from './build-update.js';

// Base case
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

// Handle null values
test('buildUpdate - Case 2', t => {
  const update = [
    {
      path: 'foo.bar[0].baz',
      value: null
    },
    {
      path: 'fizz.buzz.1.apple',
      value: 96
    },
  ];

  const expected = {
    'foo.bar.0.baz': null,
    'fizz.buzz.1.apple': 96
  };

  const actual = buildUpdate(update);

  t.deepEqual(actual, expected);
});

// Throw on path undefined
test('buildUpdate - Case 3', t => {
  const update = [
    {
      value: 'bar'
    },
    {
      path: 'fizz.buzz.1.apple',
      value: 96
    },
  ];

  const error = t.throws(() => {
    buildUpdate(update);
  });

  t.is(error.message, `'path' and 'value' are required.`);
});

// Throw on value undefined
test('buildUpdate - Case 4', t => {
  const update = [
    {
      path: 'foo.bar[0].baz',
    },
    {
      path: 'fizz.buzz.1.apple',
      value: 96
    },
  ];

  const error = t.throws(() => {
    buildUpdate(update);
  });

  t.is(error.message, `'path' and 'value' are required.`);
});
