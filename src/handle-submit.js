import preValidateForm from './pre-validate-form.js';
import validateForm from './validate-form.js';
import serializeForm from './serialize-form.js';
import filterFields from './filter-fields.js';
import applySchemaValidation from './apply-schema-validation.js';
import applySchemaValidation from './apply-schema-validation.js';

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
export default function handleSubmit({
  _fields,
  _setFields,
  fields,
  preValidate,
  validate,
  schema
}) {
  // Filter any fields if necessary.
  const f = filterFields({_fields, fields});

  // Pre-validate if desired
  const preValidated = preValidate
    ? preValidateForm({_fields: f})
    : f
  ;

  if (validate) {
    // If the user has passed in a validation schema, serialize
    // the form first so it's in the expected format for the schema.
    if (schema) {
      const values = serializeForm({
        _validatedFields: preValidated
      });

      // Now apply the schema validation.
      const { isValid, errors } = applySchemaValidation({
        values,
        schema: options.schema
      });

      if (!isValid) {
        // Update the "error" property for all fields as appropriate.
        applyErrors({
          _setFields,
          errors
        });
      }

      return {isValid, values};

    // Use the built in validators
    } else {
      const { isValid, _validatedFields } = validateForm({
        _preValidatedFields: preValidated,
        _setFields
      });

      const values = serializeForm({_validatedFields});

      return {isValid, values};
    }

  // Skip validation
  } else {
    const values = serializeForm({
      _validatedFields: preValidated
    });

    return {isValid: true, values};
  }
}
