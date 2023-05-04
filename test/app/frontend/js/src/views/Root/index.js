import React from 'react';

import './style.css';

import { Route } from 'components';

import Basic from './Basic';
import WithArrays from './WithArrays';

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
    </div>
  );
}
