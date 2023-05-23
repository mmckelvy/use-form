import React, { useState } from 'react';

import useForm from 'useForm';

export default function Basic() {
  const { fields, handleChange, handleSubmit } = useForm({
    firstName: {
      value: ''
    },
    lastName: {
      value: ''
    }
  });

  const [ valuesDisplay, setValuesDisplay ] = useState({});
  const [ fieldsDisplay, setFieldsDisplay ] = useState({});

  return (
    <div
      style={{
        margin: '0 auto',
        maxWidth: '800px',
        padding: '24px',
        display: 'grid',
        gridTemplateColumns: '1fr',
        rowGap: '48px'
      }}>

      {/* Form */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          rowGap: '16px'
        }}>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            rowGap: '8px'
          }}>

          <label style={{fontSize: '12px'}}>
            {fields.firstName.label}
          </label>

          <input
            name="firstName"
            value={fields.firstName.value}
            onChange={handleChange}
            data-cy="firstNameInput"
          />

          <span
            style={{
              color: 'red',
              fontSize: '12px'
            }}>

            {fields.firstName.error}
          </span>

        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            rowGap: '8px'
          }}>

          <label style={{fontSize: '12px'}}>
            {fields.lastName.label}
          </label>

          <input
            name="lastName"
            value={fields.lastName.value}
            onChange={handleChange}
            data-cy="lastNameInput"
          />

          <span
            style={{
              color: 'red',
              fontSize: '12px'
            }}>

            {fields.lastName.error}
          </span>

        </div>

        <button
          type="button"
          onClick={() => {
            const { isValid, values } = handleSubmit();

            if (isValid) {
              setValuesDisplay(values);
            }

            setFieldsDisplay(fields);

            console.log(values);
          }}>

          Submit
        </button>
      </div>


    {/* Serialized Values */}
    <div>
      <span>Serialized Values:</span>
      <pre>{JSON.stringify(valuesDisplay, null, 2)}</pre>
    </div>

    {/* Fields */}
    <div>
      <span>Fields:</span>
      <pre>{JSON.stringify(fieldsDisplay, null, 2)}</pre>
    </div>

    </div>
  );
}
