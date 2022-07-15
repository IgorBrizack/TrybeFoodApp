import React from 'react';
import Header from '../components/Header';

function DoneRecipes() {
  const { history } = useHistory();
  return (
    <div>
      <Header page="Done Recipes" history={ history } />
      doneRecipes
    </div>
  );
}

export default DoneRecipes;
