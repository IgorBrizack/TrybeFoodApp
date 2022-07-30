import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import Header from '../components/Header';
import ShareButton from '../components/ShareButton';
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

  function removeFromFavoriteList({ target }) {
    const removeItem = toBeRendered
      .filter((item) => item.id !== target.id);
    const newItems = JSON.stringify(removeItem);
    localStorage.setItem('favoriteRecipes', newItems);
    setToBeRendered(removeItem);
  }

  return (
    <div className="detailsItem">
      <Header page="Favorite Recipes" history={ history } />
      <div className="btnsCategory">
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ handleBtnAll }
          className="btn btn-danger"
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ handleBtnFood }
          className="btn btn-danger right"
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ handleBtnDrink }
          className="btn btn-danger right"
        >
          Drink
        </button>
      </div>
      { toBeRendered[0] && (
        toBeRendered.map((item, index) => {
          if (item.type === 'food') {
            return (
              <div key={ index } className="recipeSection">
                <div
                  className="recipeCard"
                  style={ {
                    alignItems: 'center',
                    display: 'flex',
                    flexDirection: 'column',
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
                    style={ { marginTop: '10px' } }
                  >
                    <button
                      className="btn btn-danger"
                      data-testid="favorite-btn"
                      type="button"
                      onClick={ removeFromFavoriteList }
                      src={ blackHeartIcon }
                    >
                      <img
                        id={ item.id }
                        src={ blackHeartIcon }
                        alt="favoriteIcon"
                      />
                    </button>
                  </div>
                </div>
              </div>
            );
          }
          return (
            <div key={ index } className="recipeSection">
              <div
                className="recipeCard"
                style={ {
                  alignItems: 'center',
                  display: 'flex',
                  flexDirection: 'column',
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
                  style={ { marginTop: '10px' } }
                >
                  <button
                    className="btn btn-danger"
                    data-testid="favorite-btn"
                    type="button"
                    onClick={ removeFromFavoriteList }
                    src={ blackHeartIcon }
                  >
                    <img
                      id={ item.id }
                      src={ blackHeartIcon }
                      alt="favoriteIcon"
                    />
                  </button>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

export default FavoriteRecipes;
