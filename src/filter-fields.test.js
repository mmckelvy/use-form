import test from 'ava';

import filterFields from './filter-fields.js';

// Base case
test('filterFields - Case 1', t => {
  const fields = [
    {path: 'order'},
    {path: 'products'}
  ];

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

    'order.orderNumber.includeEmpty': false,
    'order.orderNumber.value': '2453',
    'order.orderNumber.error': 'Something went wrong',
    'order.orderNumber.exclude': false,
    'order.orderNumber.isValid': false,
    'order.orderNumber.type': 'text',
    'order.orderNumber.required': true,
    'order.orderNumber.label': 'Order number',
    'order.orderNumber.path': 'order.orderNumber',
    'order.orderNumber.preValidate': false,
    'order.orderNumber.validate': false,
    'order.orderNumber.disabled': false,

    'products': null
  };

  const expected = {
    'order.orderNumber.includeEmpty': false,
    'order.orderNumber.value': '2453',
    'order.orderNumber.error': 'Something went wrong',
    'order.orderNumber.exclude': false,
    'order.orderNumber.isValid': false,
    'order.orderNumber.type': 'text',
    'order.orderNumber.required': true,
    'order.orderNumber.label': 'Order number',
    'order.orderNumber.path': 'order.orderNumber',
    'order.orderNumber.preValidate': false,
    'order.orderNumber.validate': false,
    'order.orderNumber.disabled': false,

    'products': null
  };

  const actual = filterFields({_fields, fields});

  t.deepEqual(actual, expected);
});

// With arrays
test('filterFields - Case 2', t => {
  const fields = [
    {path: 'basics.recipients[0]'},
  ];

  const _fields = {
    'basics.recipients.0.person.firstName.includeEmpty': false,
    'basics.recipients.0.person.firstName.value': 'Joe',
    'basics.recipients.0.person.firstName.error': null,
    'basics.recipients.0.person.firstName.exclude': false,
    'basics.recipients.0.person.firstName.isValid': true,
    'basics.recipients.0.person.firstName.type': 'text',
    'basics.recipients.0.person.firstName.required': true,
    'basics.recipients.0.person.firstName.label': 'First name',
    'basics.recipients.0.person.firstName.path': 'basics.recipients.0.person.firstName',
    'basics.recipients.0.person.firstName.preValidate': false,
    'basics.recipients.0.person.firstName.validate': false,
    'basics.recipients.0.person.firstName.disabled': false,
    'basics.recipients.0.person.firstName.snapshot': '',

    'basics.recipients.1.person.firstName.includeEmpty': false,
    'basics.recipients.1.person.firstName.value': 'Bill',
    'basics.recipients.1.person.firstName.error': null,
    'basics.recipients.1.person.firstName.exclude': false,
    'basics.recipients.1.person.firstName.isValid': true,
    'basics.recipients.1.person.firstName.type': 'text',
    'basics.recipients.1.person.firstName.required': true,
    'basics.recipients.1.person.firstName.label': 'First name',
    'basics.recipients.1.person.firstName.path': 'basics.recipients.1.person.firstName',
    'basics.recipients.1.person.firstName.preValidate': false,
    'basics.recipients.1.person.firstName.validate': false,
    'basics.recipients.1.person.firstName.disabled': false,
    'basics.recipients.1.person.firstName.snapshot': '',
  };

  const expected = {
    'basics.recipients.0.person.firstName.includeEmpty': false,
    'basics.recipients.0.person.firstName.value': 'Joe',
    'basics.recipients.0.person.firstName.error': null,
    'basics.recipients.0.person.firstName.exclude': false,
    'basics.recipients.0.person.firstName.isValid': true,
    'basics.recipients.0.person.firstName.type': 'text',
    'basics.recipients.0.person.firstName.required': true,
    'basics.recipients.0.person.firstName.label': 'First name',
    'basics.recipients.0.person.firstName.path': 'basics.recipients.0.person.firstName',
    'basics.recipients.0.person.firstName.preValidate': false,
    'basics.recipients.0.person.firstName.validate': false,
    'basics.recipients.0.person.firstName.disabled': false,
    'basics.recipients.0.person.firstName.snapshot': '',
  };

  const actual = filterFields({_fields, fields});

  t.deepEqual(actual, expected);
});

// Apply to subset of arrays
test('filterFields - Case 3', t => {
  const fields = [
    {path: 'basics.recipients[0].person.lastName'},
    {path: 'basics.recipients[1].person.lastName'},
  ];

  const _fields = {
    'basics.recipients.0.person.firstName.includeEmpty': false,
    'basics.recipients.0.person.firstName.value': 'Joe',
    'basics.recipients.0.person.firstName.error': null,
    'basics.recipients.0.person.firstName.exclude': false,
    'basics.recipients.0.person.firstName.isValid': true,
    'basics.recipients.0.person.firstName.type': 'text',
    'basics.recipients.0.person.firstName.required': true,
    'basics.recipients.0.person.firstName.label': 'First name',
    'basics.recipients.0.person.firstName.path': 'basics.recipients.0.person.firstName',
    'basics.recipients.0.person.firstName.preValidate': false,
    'basics.recipients.0.person.firstName.validate': false,
    'basics.recipients.0.person.firstName.disabled': false,
    'basics.recipients.0.person.firstName.snapshot': '',

    'basics.recipients.0.person.lastName.includeEmpty': false,
    'basics.recipients.0.person.lastName.value': 'Joe',
    'basics.recipients.0.person.lastName.error': null,
    'basics.recipients.0.person.lastName.exclude': false,
    'basics.recipients.0.person.lastName.isValid': true,
    'basics.recipients.0.person.lastName.type': 'text',
    'basics.recipients.0.person.lastName.required': true,
    'basics.recipients.0.person.lastName.label': 'First name',
    'basics.recipients.0.person.lastName.path': 'basics.recipients.0.person.lastName',
    'basics.recipients.0.person.lastName.preValidate': false,
    'basics.recipients.0.person.lastName.validate': false,
    'basics.recipients.0.person.lastName.disabled': false,
    'basics.recipients.0.person.lastName.snapshot': '',

    'basics.recipients.1.person.firstName.includeEmpty': false,
    'basics.recipients.1.person.firstName.value': 'Bill',
    'basics.recipients.1.person.firstName.error': null,
    'basics.recipients.1.person.firstName.exclude': false,
    'basics.recipients.1.person.firstName.isValid': true,
    'basics.recipients.1.person.firstName.type': 'text',
    'basics.recipients.1.person.firstName.required': true,
    'basics.recipients.1.person.firstName.label': 'First name',
    'basics.recipients.1.person.firstName.path': 'basics.recipients.1.person.firstName',
    'basics.recipients.1.person.firstName.preValidate': false,
    'basics.recipients.1.person.firstName.validate': false,
    'basics.recipients.1.person.firstName.disabled': false,
    'basics.recipients.1.person.firstName.snapshot': '',

    'basics.recipients.1.person.lastName.includeEmpty': false,
    'basics.recipients.1.person.lastName.value': 'Bill',
    'basics.recipients.1.person.lastName.error': null,
    'basics.recipients.1.person.lastName.exclude': false,
    'basics.recipients.1.person.lastName.isValid': true,
    'basics.recipients.1.person.lastName.type': 'text',
    'basics.recipients.1.person.lastName.required': true,
    'basics.recipients.1.person.lastName.label': 'First name',
    'basics.recipients.1.person.lastName.path': 'basics.recipients.1.person.lastName',
    'basics.recipients.1.person.lastName.preValidate': false,
    'basics.recipients.1.person.lastName.validate': false,
    'basics.recipients.1.person.lastName.disabled': false,
    'basics.recipients.1.person.lastName.snapshot': '',

  };

  const expected = {
    'basics.recipients.0.person.lastName.includeEmpty': false,
    'basics.recipients.0.person.lastName.value': 'Joe',
    'basics.recipients.0.person.lastName.error': null,
    'basics.recipients.0.person.lastName.exclude': false,
    'basics.recipients.0.person.lastName.isValid': true,
    'basics.recipients.0.person.lastName.type': 'text',
    'basics.recipients.0.person.lastName.required': true,
    'basics.recipients.0.person.lastName.label': 'First name',
    'basics.recipients.0.person.lastName.path': 'basics.recipients.0.person.lastName',
    'basics.recipients.0.person.lastName.preValidate': false,
    'basics.recipients.0.person.lastName.validate': false,
    'basics.recipients.0.person.lastName.disabled': false,
    'basics.recipients.0.person.lastName.snapshot': '',

    'basics.recipients.1.person.lastName.includeEmpty': false,
    'basics.recipients.1.person.lastName.value': 'Bill',
    'basics.recipients.1.person.lastName.error': null,
    'basics.recipients.1.person.lastName.exclude': false,
    'basics.recipients.1.person.lastName.isValid': true,
    'basics.recipients.1.person.lastName.type': 'text',
    'basics.recipients.1.person.lastName.required': true,
    'basics.recipients.1.person.lastName.label': 'First name',
    'basics.recipients.1.person.lastName.path': 'basics.recipients.1.person.lastName',
    'basics.recipients.1.person.lastName.preValidate': false,
    'basics.recipients.1.person.lastName.validate': false,
    'basics.recipients.1.person.lastName.disabled': false,
    'basics.recipients.1.person.lastName.snapshot': '',
  };

  const actual = filterFields({_fields, fields});

  t.deepEqual(actual, expected);
});

// No filter
test('filterFields - Case 4', t => {
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

    'order.orderNumber.includeEmpty': false,
    'order.orderNumber.value': '2453',
    'order.orderNumber.error': 'Something went wrong',
    'order.orderNumber.exclude': false,
    'order.orderNumber.isValid': false,
    'order.orderNumber.type': 'text',
    'order.orderNumber.required': true,
    'order.orderNumber.label': 'Order number',
    'order.orderNumber.path': 'order.orderNumber',
    'order.orderNumber.preValidate': false,
    'order.orderNumber.validate': false,
    'order.orderNumber.disabled': false,

    'products': null
  };

  const expected = {
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

    'order.orderNumber.includeEmpty': false,
    'order.orderNumber.value': '2453',
    'order.orderNumber.error': 'Something went wrong',
    'order.orderNumber.exclude': false,
    'order.orderNumber.isValid': false,
    'order.orderNumber.type': 'text',
    'order.orderNumber.required': true,
    'order.orderNumber.label': 'Order number',
    'order.orderNumber.path': 'order.orderNumber',
    'order.orderNumber.preValidate': false,
    'order.orderNumber.validate': false,
    'order.orderNumber.disabled': false,

    'products': null
  };

  const actual = filterFields({_fields});

  t.deepEqual(actual, expected);
});


