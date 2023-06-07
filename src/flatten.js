import properCase from '@mmckelvy/case/src/proper-case.js';

import isObject from './is-object.js';
import preValidate from './pre-validate.js';
import validate from './validate.js';
import serialize from './serialize.js';
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
      } else if (isObject(val) && !Object.hasOwn(val, 'value')) {
        walk(val, [...path, key], results);

      // Set defaults if necessary
      } else if (isObject(val)) {
        // values
        if (!Object.hasOwn(val, 'displayValue')) {
          val.displayValue = null;
        }

        if (!Object.hasOwn(val, 'checked')) {
          val.displayValue = null;
        }

        if (!Object.hasOwn(val, 'snapshot')) {
          val.snapshot = '';
        }

        // state data
        if (!Object.hasOwn(val, 'error')) {
          val.error = null;
        }

        if (!Object.hasOwn(val, 'isValid')) {
          val.isValid = true;
        }

        if (!Object.hasOwn(val, 'disabled')) {
          val.disabled = false;
        }

        // metadata
        if (!Object.hasOwn(val, 'type')) {
          val.type = 'text';
        }

        if (!Object.hasOwn(val, 'label')) {
          val.label = properCase(key);
        }

        if (!Object.hasOwn(val, 'placeholder')) {
          val.placeholder = null;
        }

        if (!Object.hasOwn(val, 'order')) {
          val.order = null;
        }

        // navigation
        // Note that this is not conditional.  It is
        // applied automatically.
        val.path = [...path, key].join('.');

        // validation
        if (!Object.hasOwn(val, 'required')) {
          val.required = true;
        }

        if (!Object.hasOwn(val, 'preValidate')) {
          val.preValidate = preValidate;
        }

        if (!Object.hasOwn(val, 'validate')) {
          val.validate = validate;
        }

        // serialization
        if (!Object.hasOwn(val, 'serialize')) {
          val.serialize = serialize;
        }

        if (!Object.hasOwn(val, 'includeEmpty')) {
          val.includeEmpty = false;
        }

        if (!Object.hasOwn(val, 'exclude')) {
          val.exclude = false;
        }

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
