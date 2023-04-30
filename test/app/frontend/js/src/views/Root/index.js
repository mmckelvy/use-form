import React from 'react';

import './style.css';

import useForm from '../../../../../../../src/index.js';

export default function Root() {
  const { fields, setFields, handleChange } = useForm({
    order: {
      id: {
        value: '',
      },
      items: [
        {
          productNumber: {
            value: ''
          },
          quantity: ''
        },
      ]
    }
  });

  return (
    <div>
      <input
        name="order.id"
        value={fields.order.id.value}
        onChange={handleChange}
      />
    </div>
  );
}
