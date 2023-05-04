import React from 'react';

import useForm from 'useForm';

export default function WithSelects() {
  const { fields, setFields, handleSubmit } = useForm({
    userIndex: {
      value: 0,
      exclude: true
    },
    userId: {
      value: '',
      type: 'number'
    },
    userName: {
      value: ''
    }
  });

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
          {fields.userName.label}
        </label>

        <select
          value={fields.userIndex.value}
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
        onClick={() => {
          const { isValid, values } = handleSubmit();

          console.log(values);
        }}>

        Submit
      </button>

    </div>
  );
}

