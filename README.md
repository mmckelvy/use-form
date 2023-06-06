# useForm
A lightweight, flexible hook for managing form state.

## Motivation
I wanted a React form library that could handle complex forms (e.g. nested fields, arrays) with a simple API.


## Installation
```
npm install --save @mmckelvy/use-form
```


## Usage
```jsx
import { useForm } from '@mmckelvy/use-form';

import saveDataToServer from './path-to-persistence-library';

export default function MyForm() {
  const {
    fields,
    handleChange,
    handleSubmit
  } = useForm({
    firstName: {
      value: '',
      placeholder: 'Enter your first name'
    }
  )};

  return (
    <div>
      <label>{fields.firstName.label}</label>

      <input
        name="firstName"
        value={fields.firstName.value}
        placeholder={fields.firstName.placeholder}
        onChange={handleChange}
      />
    
      <span>{fields.firstName.error}</span>

      <button
        type="button"
        onClick={() => {
          const { isValid, values } = handleSubmit();

          console.log(values); // {firstName: 'John'}

          if (isValid) {
            saveDataToServer(values);
          } else {
            console.log('There was a problem with your inputs');
          }
        }}>
        
        Submit
      </button>
    </div>
  );
}
```


## Demo and examples
```
npm install
```

In one terminal tab run:

```
npm run start:dev
```

In another terminal tab run:

```
npm run watch:dev
```

Code for each example in the demo is located [here](./demo/app/frontend/js/src/views/Root).


## Description
#### Overview
Call the `useForm` hook and pass it an `initialFields` object.  `useForm` will return an object with the following properties:

* A `fields` object with your `initialFields` updated with the latest state changes.
* A `handleChange` function you can pass to your inputs' `onChange` handlers.
* A `handleSubmit` function that will pre-validate, validate, and serialize your form.
* A `setFields` function that will set multiple field properties to values you specify.
* A `replaceFields` function that will replace multiple field properties with new fields.
* A `setResetPoint` function that will save the current state of the form for subsequent `resets`.
* A `reset` function that will reset the fields to their initial state or a reset point specified by `setResetPoint`.
* A `hasChanged` boolean value that indicates if any property in the form has changed.

The general `useForm` lifecycle is:
1. Call `useForm` with your `initialFields`.
2. Use the returned `fields` object and `handleChange` to update the fields in response to user input.
3. Use `setFields` when you need to update `selects`, custom elements, or you just need more control over field updates than what the `handleChange` function provides.
4. Call `handleSubmit` when the user submits the form.  `handleSubmit` will pre-validate all fields (remove extra space, parse numbers), validate all fields, and then serialize all fields (prepare the fields for submission to the server).  

#### Field properties
`useForm` takes an `initialFields` object.  Top level keys in the `initialFields` object correspond to the input `name` property.  Keys in the leaf object correspond to actual field properties, which include input values, metadata, validation, and other state data.  The full list of field properties, with their default values is as follows:

```
// value detail
value
displayValue
checked
snapshot
disabled

// metadata
type
label
placeholder
order
path

// validation
required
preValidate
validate
isValid
error

// serialize
serialize
includeEmpty
exclude
```

Detail for each property is included below.

**`value`**

String, number, JS date object, or a boolean.  Required.

The actual field value.

Default: empty string.


**`displayValue`**

String, number, JS date object, or a boolean.  Optional.

A human friendly alternative display value.

Default: `null`.


**`checked`**

Boolean. Optional.

The checked property for use with checkboxes if desired.

Default: `null`.


**`snapshot`**

String, number, JS date object, or a boolean. Optional.

A snapshot of the `value` property. Useful for undos.

Default: empty string


**`disabled`**

Boolean. Optional.

Whether the field is disabled.

Default: `false`.


**`type`**

String / Enum. Optional.

The field type. One of 'number', 'text', 'boolean', or 'multiLine'.

Default: `'text'`


**`label`**

String. Optional.

The field label.

Default: Proper case of the field name.  e.g. 'firstName' -> 'First name'


**`placeholder`**

String. Optional.

A placeholder value.

Default: `null`.


**`order`**

Number. Optional.

A number that can be referenced to set the order of non-array fields.

Default: `null`.


**`path`**

String. Set automatically.

A convenience property providing the full path to the field.

```javascript
foo: {
  bar: [
    {
      baz: {
        value: 8
      }
    }
  ]
}

console.log(baz.path) // foo.bar.0.baz
```

Default: automatic


**`required`**

Boolean. Optional.

Whether a field is required.

Default: `true`.


**`preValidate`**

Function or Boolean. Optional.

A function that is called during the pre-validate phase of `handleSubmit`. Signature is:

```
preValidate({ value, field, fields })
```

where `value` is the field's value, `field` is the full field with _all_ properties, and `fields` is _all_ fields with their properties.

Returns the parsed `value`.

Default: A function that trims fields of type `'text'` and `'multiLine'`, parses fields of type `'number'` to JS numbers, and converts instances of JS Date to ISO strings.

Set to `false` to skip the pre-validation step.


**`validate`**

Function or Boolean. Optional.

A function that is called after pre-validation during `handleSubmit`. Signature is:

```
validate({ value, field, fields })
```

where `value` is the field's value, `field` is the full field with _all_ properties, and `fields` is _all_ fields with their properties.

Returns an object with the following properties:

```
isValid: <Boolean>, // Whether the field is valid.
value: <String> or <Number>, // The field value
error: <String>, An error message, if applicable.
```

Default: A function that checks for empty strings if `required` is set to `true` and for numbers if `type` is set to `number`.

Set to `false` to skip the validation step.


**`isValid`**

Boolean. Optional.

Whether or not the field passed validation.

Default: `true`


**`error`**

String. Optional.

An error message. Set automatically during validation as appropriate.

Default: `null`


**`serialize`**

Function. Optional.

A function that is called after validation during `handleSubmit`.  Signature is:

```
serialize({ value, field, fields })
```

where `value` is the field's value, `field` is the full field with _all_ properties, and `fields` is _all_ fields with their properties.

Returns a serialized value.

Default: A function that returns the value (following pre-validate and validate steps).


**`includeEmpty`**

Boolean. Optional.

Whether to include the field, even when empty, when the form is serialized.

Default: `false`.


**`exclude`**

Boolean. Optional.

Whether to exclude a field when the form is serialized.

Default: `false`.


#### Field structure

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

In this case, the input name for the first key would be `basics.fruit`, and the input name for the first recipient would be `basics.recipients[0].person`.  See the [examples](./demo/app/frontend/js/src/views/Root) in the demo folder for reference.

You can nest as deeply as you want.  The one requirement is that the leaf object should hold your actual field properties (e.g. `value`, `label`, etc.).

#### Submitting the form
As referenced previously, when you call `handleSubmit`, all fields pass through a three step process:

1. pre-validation (clean up the inputs and put them into a validation ready format)
2. validation (ensure inputs match what's expected)
3. serialization (prepare the data for submission to a server / persistence layer)

Each field comes with its own `preValidate`, `validate`, and `serialize` functions out of the box.  You can override these functions with your own `preValidate` and/or `validate` functions, or opt out of pre-validation, validation, or both by passing `false` to the applicable property.

The default `preValidate` function does the following:

- Removes any extra space. 
- Converts dates to ISO strings (using `date.toISOString())`.
- Parses inputs of type `number` to actual JavaScript `numbers`.

The default `validate` function rejects empty strings if the input is required, and verifies the user passed a numeric value if the field `type` is `number`.  

Once the form passes through the validation step, `handleSubmit` will serialize the form.  This serialization process will (i) call a custom `serialize` function for a given field if you've defined one, and (ii) strip all metadata and unnecessary field properties in preparation for submission to the server.  i.e. this:

```javascript
firstName: {
  value: 'Foo',
  placeholder: 'John',
  error: null
},
```

becomes this:

```javascript
{firstName: 'Foo'}
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
  isValid: <Boolean>,
  value: <String> or <Number>,
  error: null or <String>
}
```

`serialize` should return the serialized `value`.

#### Modifying fields
`handleChange` should take care of your general `onChange` handlers.  In some cases however, you may need more control over how you set a specific field, or you may need to replace or reset one or more fields.  For that you can use `setFields` or `replaceFields`.

