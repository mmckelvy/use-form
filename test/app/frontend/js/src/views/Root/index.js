import React from 'react';

import './style.css';

import useForm from '../../../../../../../src/index.js';

export default function Root() {
  const { fields, setFields, handleChange, handleSubmit } = useForm({
    order: {
      id: {
        value: '',
      },
      shipping: {
        value: ''
      },
      items: [
        {
          productNumber: {
            value: ''
          },
          quantity: ''
        },
      ],
    }
  });

  return (
    <div
      style={{
        margin: '0 auto',
        maxWidth: 800,
        padding: 24,
        display: 'grid',
        gridTemplateColumns: '1fr',
        rowGap: '8px'
      }}>

      <input
        name="order.id"
        value={fields.order.id.value}
        onChange={handleChange}
      />

      <span>{fields.order.id.error}</span>

      <select
        name="order.shipping"
        value={fields.order.shipping.value}
        onChange={(e) => {
          setFields([
            {
              path: 'order.shipping.value',
              value: e.target.value
            }
          ]);
        }}>
        <option value="standard">Standard</option>
        <option value="express">Express</option>
      </select>

      {fields.order.items.map((item, i) => {
        return (
          <input
            key={i}
            name={`order.items[${i}].productNumber`}
            value={item.productNumber.value}
            onChange={handleChange}
          />
        );
      })}

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
