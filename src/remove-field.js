import parsePath from './parse-path.js';

export default function removeField(path, _fields) {
  return Object.entries(_fields).reduce((acc, [ key, val ]) => {
    const p = parsePath(path);
    const k = key.split('.');
    
    // We should remove if the current key segments match all of the
    // specified path segments.
    const shouldRemove = p.every((s, i) => {
      return s === k[i];
    });

    if (!shouldRemove) {
      acc[key] = val;
    }

    return acc;
  }, {});
}
