import React, { useState } from 'react';
import joi from 'joi';

import useForm from 'useForm';

export default function JoiValidation() {
  const { fields, handleChange, replaceFields, handleSubmit } = useForm({
    subject: {
      value: ''
    },
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
  const [ errorsDisplay, setErrorsDisplay ] = useState({});
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
            {fields.subject.label}
          </label>

          <input
            name="subject"
            value={fields.subject.value}
            onChange={handleChange}
            data-cy="subjectInput"
          />

          <span
            data-cy="subjectError"
            style={{
              color: 'red',
              fontSize: '12px'
            }}>

            {fields.subject.error}
          </span>

        </div>

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

                <span
                  style={{
                    color: 'red',
                    fontSize: '12px'
                  }}>
                  {r.email.error}
                </span>

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

                <span
                  style={{
                    color: 'red',
                    fontSize: '12px'
                  }}>

                  {r.location.error}
                </span>

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
            const { isValid, values, errors } = handleSubmit({
              schema: joi.object({
                subject: joi.string().required().label('Subject'),
                recipients: joi.array().min(1).items(
                  joi.object({
                    email: joi.string().required().label('Email'),
                    location: joi.string().required().label('Location')
                  })
                ).required().label('Recipients')
              })
            });

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

      {/* Errors */}
      <div>
        <span>Errors:</span>
        <pre>{JSON.stringify(errorsDisplay, null, 2)}</pre>
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
