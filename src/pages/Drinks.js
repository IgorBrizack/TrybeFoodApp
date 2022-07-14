import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

function Drinks({ history }) {
  return (
    <div>
      <Header page="Drinks" history={ history } />
      Drinks
    </div>
  );
}

Drinks.propTypes = {
  history: PropTypes.objectOf(PropTypes.any),
}.isRequired;

export default Drinks;
