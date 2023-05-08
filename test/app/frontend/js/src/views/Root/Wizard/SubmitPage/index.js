import React from 'react';

export default function SubmitPage({ handleSubmit }) {
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
