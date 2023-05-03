import properCase from '@mmckelvy/case/src/proper-case.js';

import isObject from './is-object.js';
import preValidate from './pre-validate.js';
import validate from './validate.js';
import fieldProps from './field-props.js';

/*
Converts:

{
  foo: {
    bar: 'apple',
    baz: 'banana'
  }
}

to:

{
  'foo.bar': 'apple',
  'foo.baz': 'banana'
}

Also sets default values for the various field props.  See ./field-props
for the full list.
*/
export default function flatten(fields) {
  function walk(o, path = [], results = {}) {
    for (let [ key, val ] of Object.entries(o)) {
      // We're setting a top level key to null
      if (!val) {
        results[[...path, key].join('.')] = val;

      // we're still not to the leaf object
      } else if (isObject(val) && !val.hasOwnProperty('value')) {
        walk(val, [...path, key], results);

      // Set defaults if necessary
      } else if (isObject(val)) {
        if (!val.hasOwnProperty('error')) {
          val.error = null;
        }

        if (!val.hasOwnProperty('isValid')) {
          val.isValid = true;
        }

        if (!val.hasOwnProperty('type')) {
          val.type = 'text';
        }

        if (!val.hasOwnProperty('label')) {
          val.label = properCase(key);
        }

        if (!val.hasOwnProperty('required')) {
          val.required = true;
        }

        if (!val.hasOwnProperty('preValidate')) {
          val.preValidate = preValidate;
        }

        if (!val.hasOwnProperty('validate')) {
          val.validate = validate;
        }

        if (!val.hasOwnProperty('disabled')) {
          val.disabled = false;
        }

        if (!val.hasOwnProperty('allowEmpty')) {
          val.allowEmpty = false;
        }

        if (!val.hasOwnProperty('exclude')) {
          val.exclude = false;
        }

        if (!val.hasOwnProperty('snapshot')) {
          val.snapshot = '';
        }

        // Add the path for convenience.
        val.path = [...path, key].join('.');

        walk(val, [...path, key], results);

      } else if (Array.isArray(val)) {
        for (let [ index, el ] of val.entries()) {
          walk(el, [...path, key, index], results);
        }

      } else {
        // Don't include random user generated props
        if (fieldProps.includes(key)) {
          results[[...path, key].join('.')] = val;
        }
      }
    }

    return results;
  }

  return walk(fields);
}
