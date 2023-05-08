import parsePath from './parse-path.js';

/**
 * @param {object[]} fields - An array of objects with 'path', 'preValidate',
 * and 'validate' keys.  'path' is the path to a field (foo.bar.baz).
 * 'preValidate' and 'validate' are overrides for the previously set
 * 'preValidate' and 'validate' functions.
 *
 * @param {object} _fields - The internal representation of the fields.
 *
 * @return {object} - isValid {boolean} and
 * */
export default function filterFields({ _fields, fields }) {
  if (!fields) {
    return _fields;
  }

  return Object.entries(_fields).reduce((acc, [ key, val ]) => {
    for (const f of fields) {
      const p = parsePath(f.path);
      const k = key.split('.');

      const shouldInclude = p.every((s, i) => {
        return s === k[i];
      });

      if (shouldInclude) {
        acc[key] = val;
      }
    }

    return acc;
  }, {});
}
