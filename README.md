# useForm
A lightweight, flexible hook for managing form state.


## Features
* Hooks based.
* Simple API. No render props, custom components, Context, or magic.
* Handles complex form structures including arrays and nesting.
* Built in pre-validation, validation, and serialization with override options.
* Joi integration.
* Tools to handle custom form elements (e.g. React Select), undos, resets, wizards, and more.


## Installation
```
npm install --save @mmckelvy/use-form
```


## Usage
```jsx
import useForm from '@mmckelvy/use-form';

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


## Demo
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

Default: empty string.


**`disabled`**

Boolean. Optional.

Whether the field is disabled.

Default: `false`.


**`type`**

String / Enum. Optional.

The field type. One of 'number', 'text', 'boolean', or 'multiLine'.

Default: `'text'`.


**`label`**

String. Optional.

The field label.

Default: Proper case of the field name.  e.g. 'firstName' -> 'First name'.


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

Default: automatic.


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

```js
validate({ value, field, fields })
```

where `value` is the field's value, `field` is the full field with _all_ properties, and `fields` is _all_ fields with their properties.

Returns an object with the following properties:

```js
isValid: <Boolean>, // Whether the field is valid.
value: <String> or <Number>, // The field value
error: <String>, An error message, if applicable.
```

Default: A function that checks for empty strings if `required` is set to `true` and for numbers if `type` is set to `number`.

Set to `false` to skip the validation step.


**`isValid`**

Boolean. Optional.

Whether or not the field passed validation.

Default: `true`.


**`error`**

String. Optional.

An error message. Set automatically during validation as appropriate.

Default: `null`.


**`serialize`**

Function. Optional.

A function that is called after validation during `handleSubmit`.  Signature is:

```js
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

`handleSubmit` has several options.  The signature for the function is as follows:

```javascript
handleSubmit({
  fields <Array of Objects>
  preValidate <Boolean>,
  validate <Boolean>,
  schema <Joi Validation Schema>
})
```

`fields` should be an array of the format:

```javascript
[
  {
    path: 'lastName'
  },
  ...
]
```

If you pass in `fields`, only those fields will be pre-validated, validated, and serialized.

If `preValidate` is set to `false`, pre-validation will be skipped.  Same with `validate`.

**Validating with Joi**

You can use [Joi](https://joi.dev/) schemas to validate your inputs.  Pass in a schema and that schema's `validate` method will be run against a serialized version of the form fields.  Any Joi errors will be set on the appropriate field's `error` property.

See [JoiValidation](./demo/app/frontend/js/src/views/Root/JoiValidation) for an example.

**Return Values**

`handleSubmit` returns an object with the following properties:

```javascript
{
  isValid <Boolean>,
  values <Object>,
  errors <Object>
}
```

`isValid` notes whether there were any validation errors.

`values` are the seralized values from the form.

`errors` is an object with two properties: `fieldErrors`, errors for individual fields, and `generalErrors`, errors resulting from a Joi schema validation run that don't apply to individual fields.

#### Modifying fields
`handleChange` should take care of your general `onChange` handlers.  Simply pass `handleChange` to your input's `onChange` property and useForm will take care of the rest.

useForm also provides several other functions and properties when you need to handle selects or more complicated inputs, or you need more control over form state:


**`setFields`**

Set an array of field properties at specified paths.

Signature:

```js
setFields([
  {
    path,
    value,
  },
])
```

where `path` is a path to the field property you want to set (e.g. `foo.bar.baz.value`) and `value` is the value you want to set the property to.

You can set any number of fields and you can set any field property (e.g. `value`, `displayValue`, `checked`, `error`, etc.).

See [WithSelects](./demo/app/frontend/js/src/views/Root/WithSelects) for an example of how `setFields` can help you manage a select element and [Undo](./demo/app/frontend/js/src/views/Root/WithSelects) for an example of how `setFields` can help you implement undo functionality.


**`replaceFields`**

Replace all fields at the specified key(s) with new fields.

Signature:

```js
replaceFields(fields)
```

where `fields` is a fields object that contains the new fields.  Note that the fields will replace each top level key that matches.  So if you have an existing set of fields like so:

```js
{
  employee: {
    firstName: {
      value: 'John'
    },
    lastName: {
      value: 'Smith'
    }
  }
}
```

and you call:

```js
replaceFields({
  employee: {
    firstName: {
      value: 'Bill'
    },
    lastName: {
      value: 'Jenkins'
    }
  }
})
```

The `employee` key, and everything below it will be replaced with the new `fields` object you pass in.

See [WithArrays](./demo/app/frontend/js/src/views/Root/WithArrays) for an example of how `replaceFields` can help you add and remove elements in an array of inputs.


**`setResetPoint`**

Set a reset point for later `resets`.

Signature:

```js
setRestPoint(fields)
```

where `fields` is an optional fields object.  If you don't pass in `fields`, a reset point will be created with the current form state.  If you do pass in a `fields` object, those fields will be used to set the reset point.

See [ResetForm](./demo/app/frontend/js/src/views/Root/ResetForm) for an example of how `setResetPoint` can help you reset a form.


**`reset`**

Reset a form.  If a reset point has been set via `setResetPoint`, then the form will be reset to that state, else it will be reset to its initial state.

Signature:

```js
reset()
```

This function takes no arguments.


**`hasChanged`**

A boolean value that indicates if any part of the form has changed.


## Testing
Run the unit tests

```
npm run test:unit
```

Run the component tests (uses Cypress)

```
npm run test:component
```


