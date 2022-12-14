import fieldProps from './field-props.js';
import structure from './structure.js';

/*

*/
export default function validateForm({
  _preValidatedFields,
  _setFields,
}) {
  const results = {isValid: true, _validatedFields: {}};
  const stateUpdates = {};

  for (let [ flatPath, val ] of Object.entries(_preValidatedFields)) {
    const path = flatPath.split('.');
    const pathToFieldName = path.slice(0, path.length - 1);
    const currentFieldProp = path[path.length - 1];

    if (currentFieldProp === 'value') {
      // build the field object
      const field = fieldProps.reduce((acc, prop) => {
        const k = [...pathToFieldName, prop].join('.');
        acc[prop] = _preValidatedFields[k];

        return acc;
      }, {});

      const result = !field.validate || field.disabled
        ? {
            isValid: true,
            value: val,
            error: null
          }
        : field.validate({
            value: val,
            field,
            fields: structure(_preValidatedFields)
          });

      const errorKey = [...pathToFieldName, 'error'].join('.');
      const isValidKey = [...pathToFieldName, 'isValid'].join('.');

      results.isValid = !result.isValid ? false : results.isValid;
      results._validatedFields[flatPath] = result.value;
      results._validatedFields[errorKey] = result.error;
      results._validatedFields[isValidKey] = result.isValid;

      stateUpdates[errorKey] = result.error;
      stateUpdates[isValidKey] = result.isValid;

    } else {
      results._validatedFields[flatPath] = val;
    }
  }

  _setFields((prevFields) => {
    return {
      ...prevFields,
      ...stateUpdates
    };
  });

  return results;
}
