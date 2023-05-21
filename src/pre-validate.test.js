import test from 'ava';

import preValidate from './pre-validate.js';

// Handle a clean input
test('preValidate - Case 1', t => {
  const value = 'foo';
  const field = {
    value,
    type: 'text'
  };

  const actual = preValidate({value, field});
  const expected = 'foo';

  t.is(actual, expected);
});

// Remove extra space
test('preValidate - Case 2', t => {
  const value = 'foo    ';
  const field = {
    value,
    type: 'text'
  };

  const actual = preValidate({value, field});
  const expected = 'foo';

  t.is(actual, expected);
});

// Parse numbers
test('preValidate - Case 3', t => {
  const value = '27';
  const field = {
    value,
    type: 'number'
  };

  const actual = preValidate({value, field});
  const expected = 27;

  t.is(actual, expected);
});

// Parse dates
test('preValidate - Case 4', t => {
  const value = new Date();
  const field = {
    value,
    type: 'text'
  };

  const actual = preValidate({value, field});
  const expected = value.toISOString();

  t.is(actual, expected);
});

