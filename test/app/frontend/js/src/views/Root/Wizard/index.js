import React from 'react';

import useForm from 'useForm';

import { Route } from 'components';

import PageOne from './PageOne';
import PageTwo from './PageTwo';
import PageThree from './PageThree';

export default function Wizard() {
  const { fields, handleChange, setFields, handleSubmit } = useForm({
    firstName: {
      value: ''
    },
    lastName: {
      value: ''
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

      <Route
        path="/wizard/1"
        element={
          <PageOne
            fields={fields}
            setFields={setFields}
          />
        }
      />

      <Route
        path="/wizard/2"
        element={
          <PageTwo
            fields={fields}
            setFields={setFields}
          />
        }
      />

      <Route
        path="/wizard/3"
        element={
          <PageThree
            fields={fields}
            setFields={setFields}
          />
        }
      />

    </div>
  );
}

