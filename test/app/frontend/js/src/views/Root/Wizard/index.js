import React, { useState } from 'react';

import useForm from 'useForm';

import { Route } from 'components';

import PageOne from './PageOne';
import PageTwo from './PageTwo';
import PageThree from './PageThree';
import SubmitPage from './SubmitPage';

export default function Wizard() {
  const [ page, setPage ] = useState(1);

  const { fields, handleChange, setFields, handleSubmit } = useForm({
    basics: {
      firstName: {
        value: ''
      },
      lastName: {
        value: ''
      },
    },
    shipping: {
      address: {
        value: ''
      },
      methodIndex: {
        value: 0,
        exclude: true,
        type: 'number'
      },
      methodName: {
        value: 'Ground'
      },
    },
    payment: {
      creditCardNumber: {
        value: ''
      },
      expiration: {
        value: ''
      },
    }
  });

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

      {page === 1 &&
        <PageOne
          basics={fields.basics}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          setPage={setPage}
        />
      }

      {page === 2 &&
        <PageTwo
          shipping={fields.shipping}
          handleChange={handleChange}
          setFields={setFields}
          handleSubmit={handleSubmit}
          setPage={setPage}
        />
      }

      {page === 3 &&
        <PageThree
          payment={fields.payment}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          setPage={setPage}
        />
      }

      {page === 4 &&
        <SubmitPage
          handleSubmit={handleSubmit}
        />
      }

    </div>
  );
}

