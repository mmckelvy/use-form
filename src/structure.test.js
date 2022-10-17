import test from 'ava';

import structure from './structure.js';

test('structure - case 1', t => {
  const flat = {
    'foo.bar': 'apple',
    'foo.baz': 'banana'
  };

  const actual = structure(flat);
  const expected = {
    foo: {
      bar: 'apple',
      baz: 'banana'
    }
  };

  t.deepEqual(actual, expected);
});

test('structure - case 2', t => {
  const flat = {
    'foo.bar': 'apple',
    'foo.baz': 'banana',
    'foo.buzz.0.blizz': 'grape',
    'foo.buzz.0.fizz': 'orange',
    'foo.buzz.1.blizz': 'pineapple'
  };

  const actual = structure(flat);
  const expected = {
    foo: {
      bar: 'apple',
      baz: 'banana',
      buzz: [
        {
          blizz: 'grape',
          fizz: 'orange'
        },
        {
          blizz: 'pineapple'
        }
      ]
    }
  };

  t.deepEqual(actual, expected);
});
