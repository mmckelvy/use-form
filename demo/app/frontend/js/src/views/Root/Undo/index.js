import React, { useState } from 'react';

import useForm from 'useForm';

export default function Undo() {
  const { fields, handleChange, setFields, handleSubmit } = useForm({
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
            data-cy="firstNameInput"
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
            data-cy="lastNameInput"
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
            data-cy="snapshot"
            onClick={() => {
              setFields([
                {
                  path: 'firstName.snapshot',
                  value: fields.firstName.value
                },
                {
                  path: 'lastName.snapshot',
                  value: fields.lastName.value
                },
              ]);
            }}>

            Create Snapshot
          </button>

          <button
            type="button"
            data-cy="undo"
            onClick={() => {
              setFields([
                {
                  path: 'firstName.value',
                  value: fields.firstName.snapshot
                },
                {
                  path: 'lastName.value',
                  value: fields.lastName.snapshot
                },
              ]);
            }}>

            Undo
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
          data-cy="viewFields"
          style={{width: '25%'}}
          onClick={() => {
            console.log(fields);
            setFieldsDisplay(fields);
          }}>

          View Fields
        </button>

        <span>Fields:</span>
        <pre
          data-cy="fields">

          {JSON.stringify(fieldsDisplay, null, 2)}
        </pre>
      </div>


    </div>
  );
}

