import React from 'react';

import useForm from 'useForm';

export default function PageTwo({
  shipping,
  handleChange,
  setFields,
  handleSubmit,
  setPage
}) {
  const options = [
    {
      methodIndex: 0,
      methodName: 'Ground',
    },
    {
      methodIndex: 1,
      methodName: 'Two Day Select',
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
          {shipping.address.label}
        </label>

        <input
          name="shipping.address"
          value={shipping.address.value}
          onChange={handleChange}
        />

        <span style={{color: 'red'}}>{shipping.address.error}</span>

      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          rowGap: '8px'
        }}>

        <select
          value={shipping.methodIndex.value}
          onChange={(e) => {
            const index = e.target.value;

            setFields([
              {
                path: 'shipping.methodIndex.value',
                value: index
              },
              {
                path: 'shipping.methodName.value',
                value: options[index].methodName
              },
            ]);
          }}>

          {options.map((o, i) => {
            return <option key={i} value={i}>{o.methodName}</option>;
          })}

        </select>

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
            setPage(1);
          }}>

          Back
        </button>

        <button
          type="button"
          onClick={() => {
            const { isValid, values } = handleSubmit({
              fields: [
                {path: 'shipping'}
              ]
            });

            console.log(values);

            if (isValid) {
              setPage(3);
            }

          }}>

          Next
        </button>
      </div>

    </div>
  );
}


