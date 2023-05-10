import React from 'react';

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
  );
}

