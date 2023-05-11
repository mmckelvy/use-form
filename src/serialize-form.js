import fieldProps from './field-props.js';
import structure from './structure.js';
import isObject from './is-object.js';

/*
Traverses an object removing any empty array elements in the process.
*/
function removeEmpty(obj) {
  return Object.keys(obj).reduce((acc, key) => {
    // Node is an object
    if (isObject(obj[key])) {
      acc[key] = removeEmpty(obj[key]);
    
    // Node is an array
    } else if (Array.isArray(obj[key])) {
      acc[key] = obj[key].filter(() => true)
        // Children of arrays can only be objects.
        .map((x) => {
          return removeEmpty(x);
        });
    
    // Node is a leaf
    } else {
      acc[key] = obj[key];
    }

    return acc;
  
  }, {});
}

/*

*/
export default function serializeForm({ _validatedFields }) {
  const root = {};
  let current = root;

  // Loop through all the top level keys of the validated fields.
  // This will include the actual values, as well as all the meta,
  // validate, and serialize field properties.
  for (let [ flatPath, val ] of Object.entries(_validatedFields)) {
    const path = flatPath.split('.');

    // fieldName -> "firstName" or "orders"
    // fieldProp -> "value" or "error"
    const pathToFieldName = path.slice(0, path.length - 1);
    const currentFieldProp = path[path.length - 1];

    const excludeKey = [...pathToFieldName, 'exclude'].join('.');
    const shouldExclude = _validatedFields[excludeKey];
    
    const includeEmptyKey = [...pathToFieldName, 'includeEmpty'].join('.');
    const includeEmpty = _validatedFields[includeEmptyKey];
    
    const isEmpty = typeof val === 'string' && !val.length && !includeEmpty;

    // Because we're serializing the form, we only care about the
    // actual "value" field prop.
    if (currentFieldProp === 'value' && !shouldExclude && !isEmpty) {
      
      // Loop through the top level keys in order to build the data
      // structure properly.
      for (let [ index, key ] of pathToFieldName.entries()) {
        
        // Because the outer loop is iterating through top level entries,
        // we're going to see the same top level keys over and over again.
        // If we've already seen it, we need to move down the tree
        // to get to where we left off.
        if (!current[key]) {
          
          // Next branch is the leaf (i.e. 'value').
          // Set the value and reset current to root.
          if (index === pathToFieldName.length - 1) {

            // build the field object
            const field = fieldProps.reduce((acc, prop) => {
              const k = [...pathToFieldName, prop].join('.');
              acc[prop] = _validatedFields[k];

              return acc;
            }, {});

            current[key] = !field.serialize
              ? val
              : field.serialize({
                  value: val,
                  field,
                  fields: structure(_validatedFields)
                });

            current = root;

          // The next key is an array index, which means the next
          // branch is an array.  Set up the array data structure
          // and move down into it.
          } else if (Number.isInteger(parseFloat(path[index + 1]))) {
            current[key] = [];
            current = current[key];

          // The next branch is an object.  This can be an object
          // in an array OR an object nested within another object.
          } else {
            current[key] = {};
            current = current[key];
          }

        // Move down towards to the working branch
        } else {
          current = current[key];
        }
      }
    }
  }

  const clean = removeEmpty(root);

  return clean;
}
