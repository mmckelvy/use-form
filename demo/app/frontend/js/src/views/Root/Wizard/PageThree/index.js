import React from 'react';

import useForm from 'useForm';

export default function PageThree({
  payment,
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
        rowGap: '8px'
      }}>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          rowGap: '8px'
        }}>

        <label style={{fontSize: '12px'}}>
          {payment.creditCardNumber.label}
        </label>

        <input
          name="payment.creditCardNumber"
          value={payment.creditCardNumber.value}
          onChange={handleChange}
        />

        <span style={{color: 'red'}}>{payment.creditCardNumber.error}</span>

      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          rowGap: '8px'
        }}>

        <label style={{fontSize: '12px'}}>
          {payment.expiration.label}
        </label>

        <input
          name="payment.expiration"
          value={payment.expiration.value}
          onChange={handleChange}
        />

        <span style={{color: 'red'}}>{payment.expiration.error}</span>

      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'max-content max-content',
          justifyContent: 'space-between'
        }}>

        <button
          type="button"
          onClick={() =>{
            setPage(2);
          }}>

          Back
        </button>

        <button
          type="button"
          onClick={() => {
            const { isValid, values, errors } = handleSubmit({
              fields: [
                {path: 'payment'}
              ]
            });

            console.log(values);
            console.log(errors);

            if (isValid) {
              setPage(4);
            }
          }}>

          Next
        </button>
      </div>

    </div>
  );
}

