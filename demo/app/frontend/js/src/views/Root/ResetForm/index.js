import React, { useState } from 'react';

import useForm from 'useForm';

export default function Basic() {
  const {
    fields,
    handleChange,
    setResetPoint,
    reset,
  } = useForm({
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
          />

          <span style={{color: 'red'}}>{fields.firstName.error}</span>

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
          />

          <span style={{color: 'red'}}>{fields.lastName.error}</span>

        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'max-content max-content',
            justifyContent: 'space-between'
          }}>

          <button
            type="button"
            onClick={() => {
              setResetPoint();
            }}>

            Set Reset Point
          </button>

          <button
            type="button"
            onClick={() => {
              reset();
            }}>

            Reset
          </button>
        </div>

      </div>

      {/* Fields */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          rowGap: '16px'
        }}>

        <button
          type="button"
          style={{width: '25%'}}
          onClick={() => {
            console.log(fields);
            setFieldsDisplay(fields);
          }}>

          View Fields
        </button>

        <span>Fields:</span>
        <pre>{JSON.stringify(fieldsDisplay, null, 2)}</pre>
      </div>

    </div>
  );
}

