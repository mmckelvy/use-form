import preValidateForm from './pre-validate-form.js';
import validateForm from './validate-form.js';
import serializeForm from './serialize-form.js';
import filterFields from './filter-fields.js';
import applySchemaValidation from './apply-schema-validation.js';
import buildUpdate from './build-update';

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

  const preValidated = preValidate
    ? preValidateForm({_fields: f, skipPreValidation: !preValidate})
    : f
  ;

  const results = {};

  /*
  If 'validate' is false or 'schema' is true, the default
  validation will not run.  This will just clear any errors that
  were previously set.
  */
  const {
    isValid: isValidDefault,
    _validatedFields,
    errors: defaultErrors
  } = validateForm({
    _preValidatedFields: preValidated,
    _setFields,
    skipValidation: !validate || schema
  });

  results.errors = defaultErrors;

  // Set the overall 'isValid' based on the results of the default
  // validation.
  results.isValid = isValidDefault;

  const values = serializeForm({_validatedFields});
  results.values = values;

  // Apply schema validation if necessary.  Schema validation
  // occurs after serialization because it can only be applied to serialized
  // results.
  if (schema && validate) {
    const {
      isValid: isValidSchema,
      fieldUpdates,
      errors: schemaErrors
    } = applySchemaValidation({
      _fields,
      values,
      schema
    });

    // Update the results with the results of the schema validation.
    results.isValid = isValidSchema;
    results.errors = schemaErrors;

    // Update the error fields with any new errors as appropriate.
    if (fieldUpdates.length) {
      _setFields((prevFields) => {
        return {
          ...prevFields,
          ...buildUpdate(fieldUpdates)
        };
      });
    }
  }

  return results;
}
