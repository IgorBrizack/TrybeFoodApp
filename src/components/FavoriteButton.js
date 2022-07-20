import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const FAVORITE_ICONS = [whiteHeartIcon, blackHeartIcon];

function FavoriteButton({ dataItem, type }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteIcons, setFavoriteIcons] = useState();
  const [favoritesFromStorage, setFavoritesFromStorage] = useState('');

  const addAsFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const saveOrRemoveFromFavoriteList = (action) => {
    if (action === 'adicionar') {
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
    } else {
      const itemsFromLocalStorage = JSON.parse(localStorage.getItem('favoriRecipes'));
      let removeItem = itemsFromLocalStorage.filter((item) => )
    }
  };

  useEffect(() => {
    if (localStorage.getItem('favoriteRecipes')) {
      setFavoritesFromStorage(JSON.parse(localStorage.getItem('favoriteRecipes')));
    } else {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
      setFavoritesFromStorage(JSON.parse(localStorage.getItem('favoriteRecipes')));
    }
  }, []);

  useEffect(() => {
    if (isFavorite) {
      setFavoriteIcons(FAVORITE_ICONS[1]);
      saveOrRemoveFromFavoriteList('adicionar');
    }
    if (!isFavorite) {
      setFavoriteIcons(FAVORITE_ICONS[0]);
      saveOrRemoveFromFavoriteList('remover');
    }
  },
  [isFavorite]);

  return (
    <div>
      <button
        data-testid="favorite-btn"
        type="button"
        onClick={ () => addAsFavorite() }
      >
        <img
          src={ favoriteIcons }
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
