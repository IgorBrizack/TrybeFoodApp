import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import CardFood from '../components/CardFood';
import CardDrink from '../components/CardDrink';

function DoneRecipes() {
  const { history } = useHistory();
  const storageItems = JSON.parse(localStorage.getItem('doneRecipes'));
  return (
    <div>
      <Header page="Done Recipes" history={ history } />
      <button type="button" data-testid="filter-by-all-btn">All</button>
      <button type="button" data-testid="filter-by-food-btn">Food</button>
      <button type="button" data-testid="filter-by-drink-btn">Drinks</button>
      { storageItems
      && (storageItems.map((item, index) => {
        if (item.type === 'food') {
          return (
            <CardFood
              meal={ item }
              key={ item.id }
              index={ index }
              page="doneRecipes"
            />
          );
        }
        return (
          <CardDrink
            drink={ item }
            key={ item.id }
            index={ index }
            page="doneRecipes"
          />
        );
      })
      ) }
    </div>
  );
}

export default DoneRecipes;
