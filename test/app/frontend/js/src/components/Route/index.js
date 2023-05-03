import React from 'react';

export default function Route({ path, element }) {
  const p = window.location.pathname;

  if (p === path) {
    return element;
  }

  return null;
}
