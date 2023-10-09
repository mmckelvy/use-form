import React, { useState } from 'react';

export default function SubmitPage({ fields, handleSubmit }) {
  const [ valuesDisplay, setValuesDisplay ] = useState({});
  const [ fieldsDisplay, setFieldsDisplay ] = useState({});
  const [ errorsDisplay, setErrorsDisplay ] = useState({});

  return (
    <div
      style={{
        margin: '0 auto',
        minWidth: '320px',
        maxWidth: '800px',
        padding: '24px',
        display: 'grid',
        gridTemplateColumns: '1fr',
        rowGap: '48px'
      }}>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          rowGap: '16px'
        }}>

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

      {/* Serialized Values */}
      <div>
        <span>Serialized Values:</span>
        <pre>{JSON.stringify(valuesDisplay, null, 2)}</pre>
      </div>

      {/* Errors */}
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
