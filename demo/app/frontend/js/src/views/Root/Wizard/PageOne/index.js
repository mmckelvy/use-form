import React from 'react';

import useForm from 'useForm';

export default function PageOne({
  basics,
  handleChange,
  handleSubmit,
  setPage
}) {
  return (
    <div
      style={{
        margin: '0 auto',
        maxWidth: '800px',
        padding: '24px',
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
          {basics.firstName.label}
        </label>

        <input
          name="basics.firstName"
          value={basics.firstName.value}
          onChange={handleChange}
        />

        <span style={{color: 'red'}}>{basics.firstName.error}</span>

      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          rowGap: '8px'
        }}>

        <label style={{fontSize: '12px'}}>
          {basics.lastName.label}
        </label>

        <input
          name="basics.lastName"
          value={basics.lastName.value}
          onChange={handleChange}
        />

        <span style={{color: 'red'}}>{basics.lastName.error}</span>

      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'max-content max-content',
          justifyContent: 'space-between'
        }}>

        <button
          type="button"
          disabled>

          Back
        </button>

        <button
          type="button"
          onClick={() => {
            const { isValid, values, errors } = handleSubmit({
              fields: [
                {path: 'basics'}
              ]
            });

            console.log(values);
            console.log(errors);

            if (isValid) {
              setPage(2);
            }
          }}>

          Next
        </button>
      </div>


    </div>
  );
}

