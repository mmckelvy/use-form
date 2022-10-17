import test from 'ava';

import validate from './validate.js';

test('validate - Case 1', t => {
  const info = {
    value: 'John',
    field: {
      label: 'First name',
      type: 'text',
      required: true
    }
  };

  const actual = validate(info);
  const expected = {
    isValid: true,
    value: 'John',
    error: null
  };

  t.deepEqual(actual, expected);
});

test('validate - Case 2', t => {
  const info = {
    value: '',
    field: {
      label: 'First name',
      type: 'text',
      required: true
    }
  };

  const actual = validate(info);
  const expected = {
    isValid: false,
    value: '',
    error: 'First name is required'
  };

  t.deepEqual(actual, expected);
});

test('validate - Case 3', t => {
  const info = {
    value: 56,
    field: {
      label: 'Age',
      type: 'number',
      required: true
    }
  };

  const actual = validate(info);
  const expected = {
    isValid: true,
    value: 56,
    error: null
  };

  t.deepEqual(actual, expected);
});

test('validate - Case 4', t => {
  const info = {
    value: '',
    field: {
      label: 'Age',
      type: 'number',
      required: true
    }
  };

  const actual = validate(info);
  const expected = {
    isValid: false,
    value: '',
    error: 'Age is required'
  };

  t.deepEqual(actual, expected);
});

test('validate - Case 5', t => {
  const info = {
    value: '',
    field: {
      label: 'Age',
      type: 'number',
      required: false
    }
  };

  const actual = validate(info);
  const expected = {
    isValid: true,
    value: '',
    error: null
  };

  t.deepEqual(actual, expected);
});

test('validate - Case 6', t => {
  const info = {
    value: 'hello',
    field: {
      label: 'Age',
      type: 'number',
      required: true
    }
  };

  const actual = validate(info);
  const expected = {
    isValid: false,
    value: 'hello',
    error: 'Age must be a number'
  };

  t.deepEqual(actual, expected);
});

test('validate - Case 7', t => {
  const info = {
    value: '35',
    field: {
      label: 'Age',
      type: 'number',
      required: true
    }
  };

  const actual = validate(info);
  const expected = {
    isValid: false,
    value: '35',
    error: 'Age must be a number'
  };

  t.deepEqual(actual, expected);
});

test('validate - Case 8', t => {
  const info = {
    value: NaN,
    field: {
      label: 'Age',
      type: 'number',
      required: true
    }
  };

  const actual = validate(info);
  const expected = {
    isValid: false,
    value: NaN,
    error: 'Age must be a number'
  };

  t.deepEqual(actual, expected);
});
