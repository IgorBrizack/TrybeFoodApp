import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';

function FavoriteRecipes() {
  const history = useHistory();
  return (
    <div>
      <Header page="Favorite Recipes" history={ history } />
      <div>Favorite Recipes</div>
    </div>
  );
}

export default FavoriteRecipes;
