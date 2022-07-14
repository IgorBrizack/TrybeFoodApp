import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

function DoneRecipes({ history }) {
  return (
    <div>
      <Header page="Done Recipes" history={ history } />
      doneRecipes
    </div>
  );
}

DoneRecipes.propTypes = {
  history: PropTypes.objectOf(PropTypes.any),
}.isRequired;

export default DoneRecipes;
