import test from 'ava';

import serializeForm from './serialize-form.js';

// Base case
test('serializeForm - Case 1', t => {
  const v = {
    _validatedFields: {
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
      'basics.fruit.snapshot': '',

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
      'order.orderNumber.snapshot': '',
    }
  };

  const actual = serializeForm(v);
  const expected = {
    basics: {
      fruit: 'banana',
      recipients: [
        {
          person: {
            firstName: 'Joe'
          }
        },
        {
          person: {
            firstName: 'Bill'
          }
        }
      ]
    },
    order: {
      orderNumber: '2453',
    }
  };

  t.deepEqual(actual, expected);
});

// Handle exclude
test('serializeForm - Case 2', t => {
  const v = {
    _validatedFields: {
      'firstName.includeEmpty': false,
      'firstName.value': 'Joe',
      'firstName.error': null,
      'firstName.exclude': false,
      'firstName.isValid': true,
      'firstName.type': 'text',
      'firstName.required': true,
      'firstName.label': 'First name',
      'firstName.path': 'firstName',
      'firstName.preValidate': false,
      'firstName.validate': false,
      'firstName.disabled': false,
      'firstName.snapshot': '',

      'firstNameIndex.includeEmpty': false,
      'firstNameIndex.value': 0,
      'firstNameIndex.error': null,
      'firstNameIndex.exclude': true,
      'firstNameIndex.isValid': true,
      'firstNameIndex.type': 'number',
      'firstNameIndex.required': true,
      'firstNameIndex.label': 'First name',
      'firstNameIndex.path': 'firstNameIndex',
      'firstNameIndex.preValidate': false,
      'firstNameIndex.validate': false,
      'firstNameIndex.disabled': false,
      'firstNameIndex.snapshot': '',
    }
  };

  const actual = serializeForm(v);
  const expected = {
    firstName: 'Joe'
  };

  t.deepEqual(actual, expected);
});

// Handle includeEmpty
test('serializeForm - Case 3', t => {
  const v = {
    _validatedFields: {
      'firstName.includeEmpty': false,
      'firstName.value': 'Joe',
      'firstName.error': null,
      'firstName.exclude': false,
      'firstName.isValid': true,
      'firstName.type': 'text',
      'firstName.required': true,
      'firstName.label': 'First name',
      'firstName.path': 'firstName',
      'firstName.preValidate': false,
      'firstName.validate': false,
      'firstName.disabled': false,
      'firstName.snapshot': '',

      'lastName.includeEmpty': true,
      'lastName.value': '',
      'lastName.error': null,
      'lastName.exclude': false,
      'lastName.isValid': true,
      'lastName.type': 'text',
      'lastName.required': true,
      'lastName.label': 'Last name',
      'lastName.path': 'lastName',
      'lastName.preValidate': false,
      'lastName.validate': false,
      'lastName.disabled': false,
      'lastName.snapshot': '',
    }
  };

  const actual = serializeForm(v);
  const expected = {
    firstName: 'Joe',
    lastName: ''
  };

  t.deepEqual(actual, expected);
});

// Handle custom serialize function
test('serializeForm - Case 4', t => {
  const v = {
    _validatedFields: {
      'firstName.includeEmpty': false,
      'firstName.value': 'Joe',
      'firstName.error': null,
      'firstName.exclude': false,
      'firstName.isValid': true,
      'firstName.type': 'text',
      'firstName.required': true,
      'firstName.label': 'First name',
      'firstName.path': 'firstName',
      'firstName.preValidate': false,
      'firstName.validate': false,
      'firstName.disabled': false,
      'firstName.snapshot': '',

      'quantity.includeEmpty': true,
      'quantity.value': 10,
      'quantity.error': null,
      'quantity.exclude': false,
      'quantity.isValid': true,
      'quantity.type': 'number',
      'quantity.required': true,
      'quantity.label': 'Quantity',
      'quantity.path': 'quantity',
      'quantity.preValidate': false,
      'quantity.validate': false,
      'quantity.disabled': false,
      'quantity.serialize': ({ value }) => value * 10,
      'quantity.snapshot': '',
    }
  };

  const actual = serializeForm(v);
  const expected = {
    firstName: 'Joe',
    quantity: 100
  };

  t.deepEqual(actual, expected);
});

