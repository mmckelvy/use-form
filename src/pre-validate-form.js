import fieldProps from './field-props.js';
import structure from './structure.js';

/*

*/
export default function preValidateForm({ _fields, skipPreValidation }) {
  const results = {};

  for (let [ flatPath, val ] of Object.entries(_fields)) {
    const path = flatPath.split('.');
    const pathToFieldName = path.slice(0, path.length - 1);
    const currentFieldProp = path[path.length - 1];

    // only apply pre-validation to values
    if (currentFieldProp === 'value') {
      // build the field object
      const field = fieldProps.reduce((acc, prop) => {
        const k = [...pathToFieldName, prop].join('.');
        acc[prop] = _fields[k];

        return acc;
      }, {});

      results[flatPath] = skipPreValidation || !field.preValidate
        ? val
        : field.preValidate({
            value: val,
            field,
            fields: structure(_fields)
          });

    } else {
      results[flatPath] = val;
    }
  }

  return results;
}
