import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import Header from '../components/Header';
import ShareButton from '../components/ShareButton';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteRecipes() {
  const { history } = useHistory();
<<<<<<< HEAD
  const [toBeRendered, setToBeRendered] = useState([]);
  useEffect(() => {
    const storageItems = localStorage.getItem('favoriteRecipes')
      ? JSON.parse(localStorage.getItem('favoriteRecipes')) : [];
=======
  const storageItems = localStorage.getItem('favoriteRecipes')
    ? JSON.parse(localStorage.getItem('favoriteRecipes')) : [];
  const [toBeRendered, setToBeRendered] = useState(storageItems);

  function handleBtnAll() {
>>>>>>> 1bfac58149e376172bdf0362b7898c33ed67e321
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

  // refatoracao, essas funcoes estao no doneRecipes tb

<<<<<<< HEAD
  useEffect(() => {
  }, [toBeRendered]);
=======
>>>>>>> 1bfac58149e376172bdf0362b7898c33ed67e321
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
      { toBeRendered[0] && (
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
                  <button
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
                <button
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
          );
        })
      )}
    </div>
  );
}

export default FavoriteRecipes;
