import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import CardFood from '../components/CardFood';
import CardDrink from '../components/CardDrink';

function DoneRecipes() {
  const { history } = useHistory();
  const storageItems = localStorage.getItem('doneRecipes')
    ? JSON.parse(localStorage.getItem('doneRecipes')) : [];
  const [toBeRendered, setToBeRendered] = useState(storageItems);
  function handleBtnAll() {
    setToBeRendered(storageItems);
  }
  function handleBtnFood() {
    const onlyFoods = storageItems.filter((item) => item.type === 'food');
    setToBeRendered([...onlyFoods]);
  }
  function handleBtnDrink() {
    const onlyDrinks = storageItems.filter((item) => item.type === 'drink');
    setToBeRendered([...onlyDrinks]);
  }
  return (
    <div>
      <Header page="Done Recipes" history={ history } />
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ handleBtnAll }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
        onClick={ handleBtnFood }
      >
        Food
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ handleBtnDrink }
      >
        Drinks
      </button>
      { storageItems[0]
      && (toBeRendered.map((item, index) => {
        if (item.type === 'food') {
          return (
            <CardFood
              key={ item.id }
              meal={ item }
              page="doneRecipes"
              index={ index }
            />
          );
        }
        return (
          <CardDrink
            key={ item.id }
            drink={ item }
            page="doneRecipes"
            index={ index }
          />
        );
      })
      ) }
    </div>
  );
}

export default DoneRecipes;
