import test from 'ava';

import flatten from './flatten.js';
import serialize from './serialize.js';

test('flatten - case 1', t => {
  const fields = {
    basics: {
      fruit: {
        value: 'banana',
        label: 'Fruit',
        preValidate: false,
        validate: false,
        displayValue: 'Banana'
      },
      recipients: [
        {
          person: {
            firstName: {
              value: 'Joe',
              label: 'First name',
              preValidate: false,
              validate: false,
            }
          }
        },
        {
          person: {
            firstName: {
              value: 'Bill',
              label: 'First name',
              preValidate: false,
              validate: false
            }
          }
        }
      ]
    },
    order: {
      orderNumber: {
        value: '2453',
        label: 'Order number',
        error: 'Something went wrong',
        isValid: false,
        required: true,
        type: 'text',
        preValidate: false,
        validate: false
      },
    },
    products: null
  };

  const actual = flatten(fields);
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
    'basics.fruit.checked': null,
    'basics.fruit.disabled': false,
    'basics.fruit.displayValue': 'Banana',
    'basics.fruit.snapshot': '',
    'basics.fruit.serialize': serialize,
    'basics.fruit.placeholder': null,
    'basics.fruit.order': null,

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
    'basics.recipients.0.person.firstName.checked': null,
    'basics.recipients.0.person.firstName.disabled': false,
    'basics.recipients.0.person.firstName.snapshot': '',
    'basics.recipients.0.person.firstName.displayValue': null,
    'basics.recipients.0.person.firstName.serialize': serialize,
    'basics.recipients.0.person.firstName.placeholder': null,
    'basics.recipients.0.person.firstName.order': null,

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
    'basics.recipients.1.person.firstName.checked': null,
    'basics.recipients.1.person.firstName.disabled': false,
    'basics.recipients.1.person.firstName.snapshot': '',
    'basics.recipients.1.person.firstName.displayValue': null,
    'basics.recipients.1.person.firstName.serialize': serialize,
    'basics.recipients.1.person.firstName.placeholder': null,
    'basics.recipients.1.person.firstName.order': null,

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
    'order.orderNumber.checked': null,
    'order.orderNumber.disabled': false,
    'order.orderNumber.snapshot': '',
    'order.orderNumber.displayValue': null,
    'order.orderNumber.serialize': serialize,
    'order.orderNumber.placeholder': null,
    'order.orderNumber.order': null,

    'products': null
  };


  t.deepEqual(actual, expected);
});
