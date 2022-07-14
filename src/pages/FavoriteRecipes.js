import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

function FavoriteRecipes({ history }) {
  return (
    <div>
      <Header page="Favorite Recipes" history={ history } />
      <div>Favorite Recipes</div>
    </div>
  );
}

FavoriteRecipes.propTypes = {
  history: PropTypes.objectOf(PropTypes.any),
}.isRequired;

export default FavoriteRecipes;
