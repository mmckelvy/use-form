/*
Converts:
{
  'foo.bar': 'apple',
  'foo.baz': 'banana'
}

to:

{
  foo: {
    bar: 'apple',
    baz: 'banana'
  }
}
*/
export default function structure(flatFields) {
  const root = {};
  let current = root;

  for (let [ keys, val ] of Object.entries(flatFields)) {
    const splitKeys = keys.split('.');

    for (let [ index, key ] of splitKeys.entries()) {
      // this will check for object key and array index existence
      if (!current[key]) {
        // we've reached the leaf
        // set the value and reset current to root
        if (index === splitKeys.length - 1) {
          current[key] = val;
          current = root;

        // The next key is an array index
        } else if (Number.isInteger(parseFloat(splitKeys[index + 1]))) {
          current[key] = [];
          current = current[key];

        } else {
          current[key] = {};
          current = current[key];
        }

      } else {
        current = current[key];
      }
    }
  }

  return root;
}
