import test from 'ava';

import handleSubmit from './handle-submit.js';

// Base case
test('handleSubmit - Case 1', t =>{
  const _fields = {
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

      'lastName.includeEmpty': false,
      'lastName.value': 'Smith',
      'lastName.error': null,
      'lastName.exclude': true,
      'lastName.isValid': true,
      'lastName.type': 'text',
      'lastName.required': true,
      'lastName.label': 'First name',
      'lastName.path': 'lastName',
      'lastName.preValidate': false,
      'lastName.validate': false,
      'lastName.disabled': false,
      'lastName.snapshot': '',
    }
  };


});
