import React, { } from 'react';
import propTypes from 'prop-types';
import context from './Context';

function Provider({ children }) {
  const providerState = {
    data: '',
  };

  return (
    <context.Provider value={ providerState }>
      {children}
    </context.Provider>
  );
}

Provider.propTypes = {
  children: propTypes.string,
}.isrequired;

export default Provider;
