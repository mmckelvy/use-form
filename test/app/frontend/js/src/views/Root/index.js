import React from 'react';

import './style.css';

import { Route } from 'components';

import Basic from './Basic';
import WithArrays from './WithArrays';
import WithSelects from './WithSelects';
import Wizard from './Wizard';

export default function Root() {
  return (
    <div>
      <Route
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
    </div>
  );
}
