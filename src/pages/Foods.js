import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

function Foods({ history }) {
  return (
    <div>
      <Header page="Foods" history={ history } />
      <div>Foods</div>
    </div>
  );
}

Foods.propTypes = {
  history: PropTypes.objectOf(PropTypes.any),
}.isRequired;

export default Foods;
