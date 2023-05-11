import React from 'react';

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

  return (
    <div
      style={{
        margin: '0 auto',
        maxWidth: '800px',
        padding: '24px',
        display: 'grid',
        gridTemplateColumns: '1fr',
        rowGap: '8px'
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
  );
}

