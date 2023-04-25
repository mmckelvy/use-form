import parsePath from './parse-path.js';

export default function buildUpdate(update) {
  const u = {};

  for (const { path, value } of update) {
    if (!path || !value) {
      throw new Error(`'path' and 'value' are required.`);
    }

    const key = parsePath(path).join('.');
    u[key] = value;
  }

  return u;
}
