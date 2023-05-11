import test from 'ava';

import checkFormChanged from './check-form-changed.js';

test('checkFormChanged - Case 1', t => {
  const _fields = {
    'basics.fruit.includeEmpty': false,
    'basics.fruit.value': 'banana',
    'basics.fruit.error': null,
    'basics.fruit.exclude': false,
    'basics.fruit.isValid': true,
    'basics.fruit.type': 'text',
    'basics.fruit.required': true,
    'basics.fruit.label': 'Fruit',
    'basics.fruit.path': 'basics.fruit',
    'basics.fruit.preValidate': false,
    'basics.fruit.validate': false,
    'basics.fruit.disabled': false,
    
    'basics.color.includeEmpty': false,
    'basics.color.value': 'yellow',
    'basics.color.error': null,
    'basics.color.exclude': false,
    'basics.color.isValid': true,
    'basics.color.type': 'text',
    'basics.color.required': true,
    'basics.color.label': 'Color',
    'basics.color.path': 'basics.color',
    'basics.color.preValidate': false,
    'basics.color.validate': false,
    'basics.color.disabled': false,
  };

  const resetPoint = {
    'basics.fruit.includeEmpty': false,
    'basics.fruit.value': 'apple', // this changed
    'basics.fruit.error': null,
    'basics.fruit.exclude': false,
    'basics.fruit.isValid': true,
    'basics.fruit.type': 'text',
    'basics.fruit.required': true,
    'basics.fruit.label': 'Fruit',
    'basics.fruit.path': 'basics.fruit',
    'basics.fruit.preValidate': false,
    'basics.fruit.validate': false,
    'basics.fruit.disabled': false,
    
    'basics.color.includeEmpty': false,
    'basics.color.value': 'red', // this changed
    'basics.color.error': null,
    'basics.color.exclude': false,
    'basics.color.isValid': true,
    'basics.color.type': 'text',
    'basics.color.required': true,
    'basics.color.label': 'Color',
    'basics.color.path': 'basics.color',
    'basics.color.preValidate': false,
    'basics.color.validate': false,
    'basics.color.disabled': false,
  };

  const actual = checkFormChanged({_fields, resetPoint});
  const expected = true;

  t.is(actual, expected);
});

test('checkFormChanged - Case 2', t => {
  const _fields = {
    'basics.fruit.includeEmpty': false,
    'basics.fruit.value': 'banana',
    'basics.fruit.error': null,
    'basics.fruit.exclude': false,
    'basics.fruit.isValid': true,
    'basics.fruit.type': 'text',
    'basics.fruit.required': true,
    'basics.fruit.label': 'Fruit',
    'basics.fruit.path': 'basics.fruit',
    'basics.fruit.preValidate': false,
    'basics.fruit.validate': false,
    'basics.fruit.disabled': false,
    
    'basics.color.includeEmpty': false,
    'basics.color.value': 'yellow',
    'basics.color.error': null,
    'basics.color.exclude': false,
    'basics.color.isValid': true,
    'basics.color.type': 'text',
    'basics.color.required': true,
    'basics.color.label': 'Color',
    'basics.color.path': 'basics.color',
    'basics.color.preValidate': false,
    'basics.color.validate': false,
    'basics.color.disabled': false,
  };

  const resetPoint = {
    'basics.fruit.includeEmpty': false,
    'basics.fruit.value': 'banana', // this did not change
    'basics.fruit.error': null,
    'basics.fruit.exclude': false,
    'basics.fruit.isValid': true,
    'basics.fruit.type': 'text',
    'basics.fruit.required': true,
    'basics.fruit.label': 'Fruit',
    'basics.fruit.path': 'basics.fruit',
    'basics.fruit.preValidate': false,
    'basics.fruit.validate': false,
    'basics.fruit.disabled': false,
    
    'basics.color.includeEmpty': false,
    'basics.color.value': 'yellow', // this did not change
    'basics.color.error': 'Something went wrong', // this changed
    'basics.color.exclude': false,
    'basics.color.isValid': true,
    'basics.color.type': 'text',
    'basics.color.required': true,
    'basics.color.label': 'Color',
    'basics.color.path': 'basics.color',
    'basics.color.preValidate': false,
    'basics.color.validate': false,
    'basics.color.disabled': false,
  };

  const actual = checkFormChanged({_fields, resetPoint});
  const expected = false;

  t.is(actual, expected);
});

test('checkFormChanged - Case 3', t => {
  const _fields = {
    'basics.fruit.includeEmpty': false,
    'basics.fruit.value': 'banana',
    'basics.fruit.checked': true,
    'basics.fruit.error': null,
    'basics.fruit.exclude': false,
    'basics.fruit.isValid': true,
    'basics.fruit.type': 'text',
    'basics.fruit.required': true,
    'basics.fruit.label': 'Fruit',
    'basics.fruit.path': 'basics.fruit',
    'basics.fruit.preValidate': false,
    'basics.fruit.validate': false,
    'basics.fruit.disabled': false,
    
    'basics.color.includeEmpty': false,
    'basics.color.value': 'yellow',
    'basics.color.error': null,
    'basics.color.exclude': false,
    'basics.color.isValid': true,
    'basics.color.type': 'text',
    'basics.color.required': true,
    'basics.color.label': 'Color',
    'basics.color.path': 'basics.color',
    'basics.color.preValidate': false,
    'basics.color.validate': false,
    'basics.color.disabled': false,
  };

  const resetPoint = {
    'basics.fruit.includeEmpty': false,
    'basics.fruit.value': 'banana', // this did not change
    'basics.fruit.checked': false, // this changed
    'basics.fruit.error': null,
    'basics.fruit.exclude': false,
    'basics.fruit.isValid': true,
    'basics.fruit.type': 'text',
    'basics.fruit.required': true,
    'basics.fruit.label': 'Fruit',
    'basics.fruit.path': 'basics.fruit',
    'basics.fruit.preValidate': false,
    'basics.fruit.validate': false,
    'basics.fruit.disabled': false,
    
    'basics.color.includeEmpty': false,
    'basics.color.value': 'yellow', // this did not change
    'basics.color.error': 'Something went wrong', // this changed
    'basics.color.exclude': false,
    'basics.color.isValid': true,
    'basics.color.type': 'text',
    'basics.color.required': true,
    'basics.color.label': 'Color',
    'basics.color.path': 'basics.color',
    'basics.color.preValidate': false,
    'basics.color.validate': false,
    'basics.color.disabled': false,
  };

  const actual = checkFormChanged({_fields, resetPoint});
  const expected = true;

  t.is(actual, expected);
});
