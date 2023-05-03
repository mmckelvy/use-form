import preValidateForm from './pre-validate-form.js';
import validateForm from './validate-form.js';

/*
Runs pre-validation and then validation.  Does not serialize the form.
*/
export default function handleValidate({ fields, _fields, _setFields }) {
  // If specific fields are passed, filter for _only_ those fields.
  // ...filter function here

  const preValidated = preValidateForm({_fields});

  const { isValid, _validatedFields } = validateForm({
    _preValidatedFields: preValidated,
    _setFields
  });

  return {isValid, values};
}

