import test from 'ava';

import removeField from './remove-field.js';

test('removeField - case 1', t => {
  const flatFields = {
    'basics.fruit.value': 'banana',
    'basics.fruit.error': null,
    'basics.fruit.isValid': true,
    'basics.fruit.type': 'text',
    'basics.fruit.required': true,
    'basics.fruit.label': 'Fruit',
    'basics.fruit.preValidate': false,
    'basics.fruit.validate': false,

    'basics.recipients.0.person.firstName.value': 'Joe',
    'basics.recipients.0.person.firstName.error': null,
    'basics.recipients.0.person.firstName.isValid': true,
    'basics.recipients.0.person.firstName.type': 'text',
    'basics.recipients.0.person.firstName.required': true,
    'basics.recipients.0.person.firstName.label': 'First name',
    'basics.recipients.0.person.firstName.preValidate': false,
    'basics.recipients.0.person.firstName.validate': false,

    'basics.recipients.1.person.firstName.value': 'Bill',
    'basics.recipients.1.person.firstName.error': null,
    'basics.recipients.1.person.firstName.isValid': true,
    'basics.recipients.1.person.firstName.type': 'text',
    'basics.recipients.1.person.firstName.required': true,
    'basics.recipients.1.person.firstName.label': 'First name',
    'basics.recipients.1.person.firstName.preValidate': false,
    'basics.recipients.1.person.firstName.validate': false,

    'order.orderNumber.value': '2453',
    'order.orderNumber.error': 'Something went wrong',
    'order.orderNumber.isValid': false,
    'order.orderNumber.type': 'text',
    'order.orderNumber.required': true,
    'order.orderNumber.label': 'Order number',
    'order.orderNumber.preValidate': false,
    'order.orderNumber.validate': false,
  };

  const actual = removeField('basics.recipients', flatFields);
  const expected = {
    'basics.fruit.value': 'banana',
    'basics.fruit.error': null,
    'basics.fruit.isValid': true,
    'basics.fruit.type': 'text',
    'basics.fruit.required': true,
    'basics.fruit.label': 'Fruit',
    'basics.fruit.preValidate': false,
    'basics.fruit.validate': false,

    'order.orderNumber.value': '2453',
    'order.orderNumber.error': 'Something went wrong',
    'order.orderNumber.isValid': false,
    'order.orderNumber.type': 'text',
    'order.orderNumber.required': true,
    'order.orderNumber.label': 'Order number',
    'order.orderNumber.preValidate': false,
    'order.orderNumber.validate': false,
  };


  t.deepEqual(actual, expected);
});

