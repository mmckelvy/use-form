import React, { useState } from 'react';

import useForm from 'useForm';

export default function WithSelects() {
  const options = [
    {
      userId: 1,
      userName: 'John'
    },
    {
      userId: 2,
      userName: 'Emma'
    },
    {
      userId: 3,
      userName: 'Steve'
    },
  ];

  const { fields, setFields, handleSubmit } = useForm({
    userIndex: {
      value: 0,
      type: 'number',
      exclude: true
    },
    userId: {
      value: options[0].userId,
      type: 'number'
    },
    userName: {
      value: options[0].userName
    }
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

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            rowGap: '8px'
          }}>

          <label style={{fontSize: '12px'}}>
            {fields.userName.label}
          </label>

          <select
            value={fields.userIndex.value}
            data-cy="userName"
            onChange={(e) => {
              const index = e.target.value;

              setFields([
                {
                  path: 'userIndex.value',
                  value: index
                },
                {
                  path: 'userId.value',
                  value: options[index].userId
                },
                {
                  path: 'userName.value',
                  value: options[index].userName
                },
              ]);
            }}>

            {options.map((o, i) => {
              return <option key={i} value={i}>{o.userName}</option>;
            })}

          </select>

        </div>

        <button
          type="button"
          data-cy="submit"
          style={{width: '25%'}}
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
        <pre
          data-cy="results">

          {JSON.stringify(valuesDisplay, null, 2)}
        </pre>
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

