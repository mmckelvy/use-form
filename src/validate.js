import isNumeric from './is-numeric.js';

export default function validate({ value, field }) {
  const isRequiredAndEmpty = field.required
    && typeof value === 'string'
    && value.length === 0;

  if (isRequiredAndEmpty) {
    return {
      isValid: false,
      value,
      error: `${field.label} is required`,
    }
  }

  const isNotRequiredAndEmpty = !field.required
    && typeof value === 'string'
    && value.length === 0;

  if (isNotRequiredAndEmpty) {
    return {
      isValid: true,
      value,
      error: null
    };
  }

  const isNotNumberButShouldBe = field.type === 'number'
    && !Number.isFinite(value);

  if (isNotNumberButShouldBe) {
    return {
      isValid: false,
      value,
      error: `${field.label} must be a number`
    }
  }

  return {
    isValid: true,
    value,
    error: null
  };
}
