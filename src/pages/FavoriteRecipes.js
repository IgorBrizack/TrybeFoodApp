import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import Header from '../components/Header';
import ShareButton from '../components/ShareButton';
import DesfavoriteButton from '../components/DesfavoriteButton';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteRecipes() {
  const { history } = useHistory();
  const storageItems = localStorage.getItem('favoriteRecipes')
    ? JSON.parse(localStorage.getItem('favoriteRecipes')) : [];
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

  // refatoracao, essas funcoes estao no doneRecipes tb

  return (
    <div>
      <Header page="Favorite Recipes" history={ history } />
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
        Food
      </button>
      { toBeRendered.length > 0 ? (
        toBeRendered.map((item, index) => {
          console.log(item);
          if (item.type === 'food') {
            return (
              <div
                key={ index }
                style={ {
                  alignItems: 'center',
                  border: '1px solid black',
                  display: 'flex',
                  flexDirection: 'column',
                  margin: 'auto',
                  padding: '20px',
                  width: '70%',
                } }
              >
                <Link to={ `foods/${item.id}` }>
                  <img
                    data-testid={ `${index}-horizontal-image` }
                    src={ item.image }
                    alt="itemCardImg"
                    style={ { width: '100%' } }
                  />
                  <p
                    data-testid={ `${index}-horizontal-name` }
                    style={ { textAlign: 'center', fontSize: '18px' } }
                  >
                    { item.name }
                  </p>
                </Link>
                <p
                  data-testid={ `${index}-horizontal-top-text` }
                  style={ { fontSize: '18px' } }
                >
                  { `${item.nationality} - ${item.category}` }
                </p>
                <div
                  data-testid={ `${index}-horizontal-share-btn` }
                  src={ shareIcon }
                >
                  <ShareButton id={ item.id } type="foods" />
                </div>
                <div
                  data-testid={ `${index}-horizontal-favorite-btn` }
                  src={ blackHeartIcon }
                >
                  <DesfavoriteButton dataItem={ item } />
                </div>
              </div>
            );
          }
          return (
            <div
              key={ index }
              style={ {
                alignItems: 'center',
                border: '1px solid black',
                display: 'flex',
                flexDirection: 'column',
                margin: 'auto',
                padding: '20px',
                width: '70%',
              } }
            >
              <Link to={ `drinks/${item.id}` }>
                <img
                  data-testid={ `${index}-horizontal-image` }
                  src={ item.image }
                  alt="itemCardImg"
                  style={ { width: '100%' } }
                />
                <p
                  data-testid={ `${index}-horizontal-name` }
                  style={ { textAlign: 'center', fontSize: '18px' } }
                >
                  { item.name }
                </p>
              </Link>
              <p
                data-testid={ `${index}-horizontal-top-text` }
                style={ { fontSize: '18px' } }
              >
                { item.alcoholicOrNot }
              </p>
              <div
                data-testid={ `${index}-horizontal-share-btn` }
                src={ shareIcon }
              >
                <ShareButton id={ item.id } type="drinks" />
              </div>
              <div
                data-testid={ `${index}-horizontal-favorite-btn` }
                src={ blackHeartIcon }
              >
                <DesfavoriteButton dataItem={ item } />
              </div>
            </div>
          );
        })
      ) : (console.log('nao temos favoritos')) }
    </div>
  );
}

export default FavoriteRecipes;
