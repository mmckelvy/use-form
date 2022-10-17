/*
@return {boolean} True if the form values have changed vs. the reset point,
false if not.

Only checks the value properties.
*/
export default function checkFormChanged({ _fields, resetPoint }) {
  for (const [ key, val ] of Object.entries(_fields)) {
    const pathArr = key.split('.');
    const leaf = pathArr[pathArr.length - 1];

    if (leaf === 'value' || leaf === 'checked') {
      if (_fields[key] !== resetPoint[key]) {
        return true;
      }
    }
  }

  return false;
}
