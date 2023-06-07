import parsePath from './parse-path.js';

/*
@param {array of objects} update - Keys should be 'path' and 'value'
*/
export default function buildUpdate(update) {
  const u = {};

  for (const o of update) {
    if (!Object.hasOwn(o, 'path') || !Object.hasOwn(o, 'value')) {
      throw new Error(`'path' and 'value' are required.`);
    }

    const key = parsePath(o.path).join('.');
    u[key] = o.value;
  }

  return u;
}
