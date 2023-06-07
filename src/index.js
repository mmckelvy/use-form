import { useState } from 'react';

import parsePath from './parse-path.js';
import flatten from './flatten.js';
import structure from './structure.js';
import _removeField from './remove-field.js';
import _handleSubmit from './handle-submit.js';
import checkFormChanged from './check-form-changed.js';
import buildUpdate from './build-update.js';

function _handleChange(e, _setFields) {
  const name = e.target.name;
  const val = e.target.type === 'checkbox'
    ? e.target.checked
    : e.target.value;

  const key = [...parsePath(name), 'value'].join('.');

  _setFields((prevFields) => {
    return {
      ...prevFields,
      [key]: val
    };
  });
}

/*
Set any property of an individual field
*/
function _setField(path, value, _setFields) {
  const key = parsePath(path).join('.');
  _setFields((prevFields) => {
    return {
      ...prevFields,
      ...{[key]: value}
    };
  })
}

/*
_fields {private}: flat object for easy React state manipulation.
fields {public}: nested object for easy consumption by users.

See './flatten' for a list of field defaults.

Specify field options
*/
export default function useForm(initialFields = {}) {
  const init = flatten(initialFields);
  const [ _fields, _setFields ] = useState(init);
  const [ resetPoint, _setResetPoint ] = useState(init);

  return {
    fields: structure(_fields),
    handleChange: (e) => {
      _handleChange(e, _setFields);
    },
    handleSubmit: ({ fields } = {}) => {
      return _handleSubmit({_fields, _setFields, fields});
    },
    setFields: (update) => {
      _setFields((prevFields) => {
        return {
          ...prevFields,
          ...buildUpdate(update)
        };
      });
    },
    replaceFields: (fields, options = {}) => {
      let updatedFields;
      
      _setFields((_prevFields) => {
        const topLevelKeys = Object.keys(fields);

        updatedFields = topLevelKeys.reduce((acc, key) => {
          acc = _removeField(key, acc);
          return acc;
        }, _prevFields);
        
        return {...updatedFields, ...flatten(fields)};
      });

      if (options.setResetPoint) {
        _setResetPoint({...updatedFields, ...flatten(fields)});
      }
    },
    setResetPoint: (fields) => {
      if (fields) {
        _setResetPoint(flatten(fields));
      }
      _setResetPoint(_fields);
    },
    reset: () => {
      _setFields(resetPoint);
    },
    hasChanged: checkFormChanged({_fields, resetPoint}),
    setField: (path, value) => {
      _setField(path, value, _setFields);
    },
    removeField: (path) => {
      const f = _removeField(path, _fields);
      _setFields(f);
    },
  };
};
