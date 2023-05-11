# useForm
A lightweight, flexible hook for managing form state.

## Installation
```
npm install --save @mmckelvy/use-form
```

## Usage
```javascript
import { useForm } from 'utils';

export default function MyForm() {
  const {
    fields,
    handleChange,
    handleSubmit
  } = useForm({
    deviceName: {
      value: '',
      placeholder: 'Cold room sensor #1'
    }
  )};

  return (
    <div>
      <input
        name="deviceName"
        value={fields.deviceName.value}
        placeholder={fields.device.placeholder}
        onChange={handleChange}
      />
    
      <button
        type="button"
        onClick={() => {
          const { isValid, values } = handleSubmit();

          if (isValid) {
            // However you persist data to the server.
            saveDataToServer(values);
          } else {
            console.log('There was a problem with your inputs');
          }
        }>
        
        Submit
      </button>
    </div>
  );
}
```




Code for the examples is located in the [Examples](./examples/app/frontend/js/src/views/Examples) folder.

### Description
#### Overview
Call the `useForm` hook and pass it an `initialFields` object.  `useForm` will return:

* A `fields` object with your `initialFields` updated with the latest state changes.
* A `handleChange` function you can pass to your inputs' `onChange` handlers.
* A `handleSubmit` function that will pre-validate, validate, and serialize your form.
* A `setField` function that will set the value for an individual field.
* A `setFields` function that will replace multiple fields with new fields.
* A `reset` function that will reset the fields to their initial state.

The general `useForm` lifecycle is:
1. Call `useForm` with your `initialFields`.
2. Use the returned `fields` object and `handleChange` to update the fields in response to user input.
3. Use `setField`, `setFields`, and `reset` to handle edge cases, add / remove inputs, and reset fields.
4. Call `handleSubmit` when the user submits the form.  `handleSubmit` will pre-validate all fields (remove extra space, parse numbers), validate all fields, and then serialize all fields (prepare the fields for submission to the server).  

#### Field properties
`useForm` takes an `initialFields` object.  Top level keys in the `initialFields` object correspond to the input `name` property.  Keys in the leaf object correspond to actual field properties, which include input values, metadata, validation, and other state data.  The full list of field properties, with their default values is as follows:

```javascript
  // state data
  'value',
  'displayValue', // default null
  'checked', // default undefined
  'error', // default null
  'isValid', // default true
  'disabled', // default false
  'allowEmpty', // default false

  // metadata
  'type', // default text
  'label', // default proper case of the immediate parent key
  'placeholder', // default undefined

  // validation
  'required', // default true
  'preValidate', // see ./pre-validate.js for default preValidate function
  'validate', // see ./validate.js for default validate function

  // serialize
  'serialize' // default undefined
];
```

Fields can have nested or array structures: 

```javascript
const fields = {
  basics: {
    fruit: {
      value: 'banana',
      label: 'Fruit',
    },
    recipients: [
      {
        person: {
          firstName: {
            value: 'Joe',
            label: 'First name',
          }
        }
      },
      {
        person: {
          firstName: {
            value: 'Bill',
            label: 'First name',
          }
        }
      }
    ]
  },
  order: {
    orderNumber: {
      value: '2453',
      label: 'Order number',
    },
  }
};
```

In this case, the input name for the first key would be `basics.fruit`, and the input name for the first recipient would be `basics.recipients[0].person`.

You can nest as deeply as you want.  The one requirement is that the leaf object should hold your actual field properties (e.g. `value`, `label`, etc.).

The only required field property is `value`.  The rest are either optional or will be set to default values for you.  The default values are specified in the field property list above.

A few notes on the basic field properties:

`value` is the actual input value.

`type` refers to standard input types (e.g. "text", "number", etc.).  If your input is a number, you should make sure and specify `type="number"`.

All fields are active (i.e. `disabled` is set to `false`), non-empty (i.e. `allowEmpty` is set to false), and `required` by default.  You can change this default behavior by setting any of these boolean props appropriately.

`preValidate` and `validate` are set to default pre-validation and validation functions.  You can override these with your own functions or turn them off setting them to `false`.  See "Submitting the form" below. 

#### Submitting the form
As referenced previously, when you call `handleSubmit`, all fields pass through a three step process:

1. pre-validation (clean up the inputs and put them into a validation ready format).
2. validation (ensure inputs match what's expected)
3. serialization (prepare the data for submission to a server)

Each field comes with its own `preValidate`, `validate` functions out of the box.  You can override these functions with your own `preValidate` and/or `validate` functions, or opt out of pre-validation, validation, or both by passing `false` to the applicable property.   

The default `preValidate` function does the following:

- Removes any extra space. 
- Converts dates to ISO strings (using `date.toISOString())`.
- Parses inputs of type `number` to actual JavaScript `numbers`.

The default `validate` function rejects empty strings if the input is required, and verifies the user passed a numeric value if the field `type` is `number`.  

Once the form passes through the validation step, `handleSubmit` will serialize the form.  This serialization process will (i) call a custom `serialize` function for a given field if you've defined one, and (ii) strip all metadata and unnecessary field properties in preparation for submission to the server.  i.e. this:

```javascript
deviceName: {
  value: 'Foo',
  placeholder: 'Cold room sensor #1',
  error: null
},
```

becomes this:

```javascript
{deviceName: 'Foo'}
```

Again, you can pass your own function for `preValidate`, `validate`, and/or `serialize`.  The signature for all three functions is:

`preValidate / validate / serialize({ value <string>, field, <object>, fields <object> })`
`value` is the input value.
`field` is the full field object for the current field.
`fields` is the full fields object (i.e. all the fields).

`preValidate` should return a clean `value`.
`validate` should return the following object:

```javascript
{
  isValid: <boolean>,
  value: <string> or <number>,
  error: null or <string>
}
```

`serialize` should return the serialized `value`.

#### Modifying fields
`handleChange` should take care of your general `onChange` handlers.  In some cases however, you may need more control over how you set a specific field, or you may need to replace or reset one or more fields.  For that you can use `setField`, `setFields`, and `reset`.  Signatures and functionality are as follows:

`setField(path <string>, value <string>)`.
Sets a field property specified in `path` to a `value`.

`setFields(fields <object>)`.
Replaces existing fields with the specified `fields`.  This is a merge operation, so any fields *not* included will remain the same.

`reset()`.
Resets all fields to their initial values.
