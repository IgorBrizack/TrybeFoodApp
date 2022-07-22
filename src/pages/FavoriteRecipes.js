import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import CardFood from '../components/CardFood';
import CardDrink from '../components/CardDrink';
import FavoriteButton from '../components/FavoriteButton';

function FavoriteRecipes() {
  const { history } = useHistory();
  const storageItems = JSON.parse(localStorage.getItem('favoriteRecipes'));
  return (
    <div>
      <Header page="Done Recipes" history={ history } />
      <button type="button" data-testid="filter-by-all-btn">All</button>
      <button type="button" data-testid="filter-by-food-btn">Food</button>
      <button type="button" data-testid="filter-by-drink-btn">Drinks</button>
      { storageItems
      && (storageItems.map((item, index) => {
        if (item.type === 'Foods') {
          return (
            <>
              <CardFood
                key={ item.id }
                meal={ item }
                page="favoriteRecipes"
                index={ index }
              />
              <FavoriteButton dataItem={ item } type={ item.type } />
            </>
          );
        }
        return (
          <>
            <CardDrink
              key={ item.id }
              drink={ item }
              page="favoriteRecipes"
              index={ index }
            />
            <FavoriteButton dataItem={ item } type={ item.type } />
          </>
        );
      })
      ) }
    </div>
  );
}

export default FavoriteRecipes;
