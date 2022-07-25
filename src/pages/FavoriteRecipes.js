import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import ShareButton from '../components/ShareButton';
import DesfavoriteButton from '../components/DesfavoriteButton';

function FavoriteRecipes() {
  const { history } = useHistory();
  const [toBeRendered, setToBeRendered] = useState([]);
  useEffect(() => {
    const storageItems = localStorage.getItem('favoriteRecipes')
      ? JSON.parse(localStorage.getItem('favoriteRecipes')) : [];
    setToBeRendered(storageItems);
  }, []);

  useEffect(() => {
  }, [toBeRendered]);
  return (
    <div>
      <Header page="Favorite Recipes" history={ history } />
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ () => {} }
      >
        All
      </button>
      <button type="button" data-testid="filter-by-food-btn">Food</button>
      <button type="button" data-testid="filter-by-drink-btn">Drinks</button>
      { toBeRendered.length > 0 ? (
        toBeRendered.map((item, index) => {
          if (item.type === 'food') {
            return (
              <div
                key={ item.id }
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
                <img
                  data-testid={ `${index}-horizontal-image` }
                  src={ item.image }
                  alt="itemCardImg"
                  style={ { width: '100%' } }
                />
                <h3
                  data-testid={ `${index}-horizontal-top-text` }
                  style={ { fontSize: '18px' } }
                >
                  { `${item.alcoholicOrNot} - ${item.category}` }
                </h3>
                <h3
                  data-testid={ `${index}-horizontal-name` }
                  style={ { textAlign: 'center', fontSize: '18px' } }
                >
                  { item.name }
                </h3>
                <div
                  data-testid={ `${index}-horizontal-share-btn` }
                >
                  <ShareButton id={ item.id } type="foods" />
                </div>
                <div
                  data-testid={ `${index}-horizontal-favorite-btn` }
                >
                  <DesfavoriteButton dataItem={ item } />
                </div>
              </div>
            );
          }
          return (
            <div
              key={ item.id }
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
              <img
                data-testid={ `${index}-horizontal-image` }
                src={ item.image }
                alt="itemCardImg"
                style={ { width: '100%' } }
              />
              <h3
                data-testid={ `${index}-horizontal-top-text` }
                style={ { fontSize: '18px' } }
              >
                { `${item.alcoholicOrNot} - ${item.category}` }
              </h3>
              <h3
                data-testid={ `${index}-horizontal-name` }
                style={ { textAlign: 'center', fontSize: '18px' } }
              >
                { item.name }
              </h3>
              <div
                data-testid={ `${index}-horizontal-share-btn` }
              >
                <ShareButton id={ item.id } type="drinks" />
              </div>
              <div
                data-testid={ `${index}-horizontal-favorite-btn` }
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
