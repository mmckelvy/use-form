import React from 'react';

import './style.css';

import { Route } from 'components';

import Basic from './Basic';
import WithArrays from './WithArrays';
import WithSelects from './WithSelects';
import Wizard from './Wizard';
import Undo from './Undo';
import ResetForm from './ResetForm';
import KitchenSink from './KitchenSink';
import JoiValidation from './JoiValidation';

import Experimental from './Experimental';

export default function Root() {
  return (
    <div
      style={{
        padding: '24px'
      }}>

      <div
        style={{
          marginBottom: '24px',
          display: 'grid',
          gridTemplateColumns: '1fr',
          rowGap: '8px'
        }}>

        <a href="/basic">Basic</a>
        <a href="/with-arrays">With Arrays</a>
        <a href="/with-selects">With Selects</a>
        <a href="/wizard">Wizard</a>
        <a href="/undo">Undo</a>
        <a href="/reset-form">Reset Form</a>
        <a href="/kitchen-sink">Kitchen Sink</a>
        <a href="/joi-validation">Joi Validation</a>
        <a href="/experimental">Experimental</a>
      </div>


      <Route
        index
        path="/basic"
        element={<Basic />}
      />

      <Route
        path="/with-arrays"
        element={<WithArrays />}
      />

      <Route
        path="/with-selects"
        element={<WithSelects />}
      />

      <Route
        path="/wizard"
        element={<Wizard />}
      />

      <Route
        path="/undo"
        element={<Undo />}
      />
      <Route
        path="/reset-form"
        element={<ResetForm />}
      />
      <Route
        path="/kitchen-sink"
        element={<KitchenSink />}
      />
      <Route
        path="/joi-validation"
        element={<JoiValidation />}
      />
      <Route
        path="/experimental"
        element={<Experimental />}
      />
    </div>
  );
}
