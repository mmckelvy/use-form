export default function applySchemaValidation({ _fields, values, schema }) {
  const results = schema.validate(values, {abortEarly: false});

  if (results.error) {
    const x = results.error.details.reduce((acc, e) => {
      if (Object.hasOwn(_fields, [...e.path, 'value'].join('.'))) {
        const errorPath = [...e.path, 'error'].join('.');
        const isValidPath = [...e.path, 'isValid'].join ('.');

        acc.fieldUpdates.push({
          path: errorPath,
          value: e.message.replaceAll(`"`, ''),
        });

        acc.fieldUpdates.push({
          path: isValidPath,
          value: false
        });

        acc.fieldErrors.push({
          path: errorPath,
          message: e.message.replaceAll(`"`, ''),
        });

      } else {
        acc.generalErrors.push({
          path: e.path.join('.'),
          message: e.message.replaceAll(`"`, ''),
        });
      }

      return acc;

    }, {
      fieldUpdates: [],
      fieldErrors: [],
      generalErrors: []
    });

    return {
      isValid: false,
      fieldUpdates: x.fieldUpdates,
      errors: {
        fieldErrors: x.fieldErrors,
        generalErrors: x.generalErrors
      }
    };
  }

  return {
    isValid: true,
    fieldUpdates: [],
    errors: {
      fieldErrors: [],
      generalErrors: []
    }
  };
}
