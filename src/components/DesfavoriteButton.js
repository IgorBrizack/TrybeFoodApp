import React from 'react';
import PropTypes from 'prop-types';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function DesfavoriteButton({ dataItem }) {
  const removeFromFavoriteList = () => {
    const itemsFromLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (itemsFromLocalStorage) {
      const removeItem = itemsFromLocalStorage
        .filter((item) => item.id !== dataItem.id);
      localStorage.setItem('favoriteRecipes', removeItem);
    }
  };

  return (
    <button
      data-testid="favorite-btn"
      type="button"
      onClick={ () => removeFromFavoriteList() }
      src={ blackHeartIcon }
    >
      <img
        src={ blackHeartIcon }
        alt="favoriteIcon"
      />
    </button>
  );
}

DesfavoriteButton.propTypes = {
  dataItem: PropTypes.objectOf(PropTypes.any),
}.isRequired;

export default DesfavoriteButton;
