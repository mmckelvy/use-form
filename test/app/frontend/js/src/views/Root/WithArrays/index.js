import React from 'react';

import useForm from 'useForm';

export default function WithArrays() {
  const { fields, handleChange, replaceFields, handleSubmit } = useForm({
    recipients: [
      {
        email: {
          value: ''
        },
        location: {
          value: ''
        }
      }
    ]
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

      {fields.recipients.map((r, i) => {
        return (
          <div
            key={i}
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              columnGap: '8px',
            }}>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr',
                rowGap: '8px'
              }}>

              <label style={{fontSize: '12px'}}>
                {r.email.label}
              </label>

              <input
                name={`recipients[${i}].email`}
                value={r.email.value}
                onChange={handleChange}
              />

              <span style={{color: 'red'}}>{r.email.error}</span>

            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr',
                rowGap: '8px'
              }}>

              <label style={{fontSize: '12px'}}>
                {r.location.label}
              </label>

              <input
                name={`recipients[${i}].location`}
                value={r.location.value}
                onChange={handleChange}
              />

              <span style={{color: 'red'}}>{r.location.error}</span>

            </div>

          </div>
        );
      })}

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'max-content max-content',
          justifyContent: 'space-between'
        }}>

        <button
          type="button"
          onClick={() => {
            const r = fields.recipients.slice(0, fields.recipients.length - 1)

            replaceFields({
              recipients: r
            });
          }}>

          - Remove recipient
        </button>

        <button
          type="button"
          onClick={() => {
            replaceFields({
              recipients: [
                ...fields.recipients,
                {
                  email: {
                    value: ''
                  },
                  location: {
                    value: ''
                  }
                }
              ]
            })
          }}>

          + Add recipient
        </button>
      </div>

      <button
        type="button"
        onClick={() => {
          const { isValid, values } = handleSubmit();

          console.log(values);
        }}>

        Submit
      </button>

    </div>
  );
}


