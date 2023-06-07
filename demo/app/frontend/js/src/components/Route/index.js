import React from 'react';

export default function Route({ path, element }) {
  const w = window.location.pathname.split('/').slice(1);
  const p = path.split('/').slice(1);

  const match = p.every((s, i) => {
    return s === w[i];
  });

  if (match) {
    return element;
  }

  return null;
}
