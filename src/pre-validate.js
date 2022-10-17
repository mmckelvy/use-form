import isNumeric from './is-numeric.js';

function removeExtraSpace(val) {
  if (typeof val !== 'string') {
    throw new Error(
      `Input type is 'text' but value ${val} is a '${typeof val}'.`
    );
  }

  return val.replace(/\s+/g, ' ');
}

function parseNumeric(val) {
  if (typeof val === 'number') {
    return val;
  }

  // remove non-numeric chars...
  let cleanVal = '';
  const regEx = /[\d\.]/;

  for (let char of val) {
    const isDigitChar = regEx.test(char);

    if (isDigitChar) {
      cleanVal += char;
    }
  }

  // ...then attempt to parse
  if (isNumeric(cleanVal)) {
    return parseFloat(cleanVal);
  }

  // not numeric, just return the val
  return val;
}

export default function preValidate({ value, field }) {
  if (value instanceof Date) {
    return value.toISOString();
  }

  if (field.type === 'number') {
    return parseNumeric(value);
  }

  if (field.type === 'multiLine') {
    if (typeof value !== 'string') {
      throw new Error(
        `Input type is 'text' but value ${val} is a '${typeof value}'.`
      );
    }

    return value.trim();
  }

  if (field.type === 'boolean') {
    return value;
  }

  return removeExtraSpace(value).trim();
}
