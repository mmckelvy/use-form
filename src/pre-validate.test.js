import test from 'ava';

import preValidate from './pre-validate.js';

// Handle a clean input
test('preValidate - Case 1', t => {
  const value = 'foo';
  const field = {
    firstName: {
      value: 'foo',
      type: 'text'
    }
  };

  const actual = preValidate({value, field});
  const expected = 'foo';

  t.is(actual, expected);
});

// Remove extra space
test('preValidate - Case 2', t => {
  const value = 'foo    ';
  const field = {
    firstName: {
      value: 'foo',
      type: 'text'
    }
  };

  const actual = preValidate({value, field});
  const expected = 'foo';

  t.is(actual, expected);
});

// Parse numbers
test('preValidate - Case 3', t => {
  const value = 'foo    ';
  const field = {
    firstName: {
      value: '27',
      type: 'number'
    }
  };

  const actual = preValidate({value, field});
  const expected = 27;

  t.is(actual, expected);
});

