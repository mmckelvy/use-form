import parsePath from './parse-path.js';

/*
@param {array of objects} update - Keys should be 'path' and 'value'
*/
export default function buildUpdate(update) {
  const u = {};

  for (const { path, value } of update) {
    if (path == null || value == null) {
      throw new Error(`'path' and 'value' are required.`);
    }

    const key = parsePath(path).join('.');
    u[key] = value;
  }

  return u;
}
