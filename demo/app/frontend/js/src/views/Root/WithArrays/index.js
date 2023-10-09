import React, { useState } from 'react';

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

  const [ valuesDisplay, setValuesDisplay ] = useState({});
  const [ fieldsDisplay, setFieldsDisplay ] = useState({});
  const [ errorsDisplay, setErrorsDisplay ] = useState({});

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
            data-cy="removeRecipient"
            disabled={fields.recipients.length < 2}
            onClick={() => {
              const r = fields.recipients
                .slice(0, fields.recipients.length - 1)

              replaceFields({
                recipients: r
              });
            }}>

            - Remove recipient
          </button>

          <button
            type="button"
            data-cy="addRecipient"
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
            const { isValid, values, errors } = handleSubmit();
            setValuesDisplay(values);
            setErrorsDisplay(errors);
          }}>

          Submit
        </button>
      </div>

      {/* Serialized values */}
      <div>
        <span>Serialized Values:</span>
        <pre>{JSON.stringify(valuesDisplay, null, 2)}</pre>
      </div>

      <div>
        <span>Errors:</span>
        <pre>

          {JSON.stringify(errorsDisplay, null, 2)}
        </pre>
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
          data-cy="fieldsDisplay">

          {JSON.stringify(fieldsDisplay, null, 2)}
        </pre>
      </div>

    </div>
  );
}


