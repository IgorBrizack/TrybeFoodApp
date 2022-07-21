import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteButton({ dataItem, type }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoritesFromStorage, setFavoritesFromStorage] = useState('');

  const addAsFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const saveOrRemoveFromFavoriteList = (action) => {
    if (action) {
      switch (type) {
      case 'Foods':
        localStorage.setItem('favoriteRecipes', JSON
          .stringify([...favoritesFromStorage, {
            id: dataItem[0].idMeal,
            type: 'food',
            nationality: dataItem[0].strArea,
            category: dataItem[0].strCategory,
            alcoholicOrNot: '',
            name: dataItem[0].strMeal,
            image: dataItem[0].strMealThumb,
          }]));
        break;
      default:
        localStorage.setItem('favoriteRecipes', JSON
          .stringify([...favoritesFromStorage, {
            id: dataItem[0].idDrink,
            type: 'drink',
            nationality: '',
            category: dataItem[0].strCategory,
            alcoholicOrNot: dataItem[0].strAlcoholic,
            name: dataItem[0].strDrink,
            image: dataItem[0].strDrinkThumb,
          }]));
      }
    } else if (!action) {
      const itemsFromLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
      let removeItem = '';
      switch (type) {
      case 'Foods':
        if (itemsFromLocalStorage) {
          removeItem = itemsFromLocalStorage
            .filter((item) => item.id !== dataItem[0].idMeal);
          localStorage.setItem('favoriteRecipes', removeItem);
        }
        break;
      default:
        if (itemsFromLocalStorage) {
          removeItem = itemsFromLocalStorage
            .filter((item) => item.id !== dataItem[0].idDrink);
          localStorage.setItem('favoriteRecipes', removeItem);
        }
      }
    }
  };

  useEffect(() => {
    const auxiliar = type === 'Foods' ? 'idMeal' : 'idDrink';
    if (localStorage.getItem('favoriteRecipes')) {
      const dataStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
      setFavoritesFromStorage(dataStorage);
      if (dataStorage.some((item) => item.id === dataItem[0][auxiliar])) {
        addAsFavorite();
      }
    } else {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
      setFavoritesFromStorage(JSON.parse(localStorage.getItem('favoriteRecipes')));
    }
  }, []);

  const handleClick = () => {
    addAsFavorite();
    saveOrRemoveFromFavoriteList(!isFavorite);
  };

  return (
    <div>
      <button
        data-testid="favorite-btn"
        type="button"
        onClick={ handleClick }
        src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
      >
        <img
          src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
          alt="favoriteIcon"
        />
      </button>
    </div>
  );
}

FavoriteButton.propTypes = {
  dataItem: PropTypes.objectOf(PropTypes.any),
  type: PropTypes.string,
}.isRequired;

export default FavoriteButton;
