import React from 'react';
import { useHistory } from 'react-router-dom';
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
