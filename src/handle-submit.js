import preValidateForm from './pre-validate-form.js';
import validateForm from './validate-form.js';
import serializeForm from './serialize-form.js';
import filterFields from './filter-fields.js';

/*
Pre-validates, validates, and then serializes a set of _fields.

Pre-validation will use a custom function if supplied, else will use
the default function defined in './pre-validate'.  If the boolean false is
supplied, pre-validation will be skipped.

Validation follows the same process.

Serialization will use a custom function if supplied, else will just
pass the value on through.

returns an object with the following key value pairs:
{
  isValid: {boolean},
  values: {object}
}

The values object removes all field props except for the value, and collapses
the field into a {name: value} format.

Example:

{
  address: {
    value: '123 Fake Street',
    label: 'Address',
    required: true
  }
}

becomes:

{
  address: '123 Fake Street'
}
*/
export default function handleSubmit({ _fields, _setFields, fields }) {
  // Filter any fields if necessary.
  const f = filterFields({_fields, fields});

  const preValidated = preValidateForm({_fields: f});

  const { isValid, _validatedFields } = validateForm({
    _preValidatedFields: preValidated,
    _setFields
  });

  const values = serializeForm({_validatedFields});

  return {isValid, values};
}
