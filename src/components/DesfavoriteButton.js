import React from 'react';
import PropTypes from 'prop-types';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function DesfavoriteButton({ dataItem, setToBeRendered, toBeRendered }) {
  const removeFromFavoriteList = () => {
    const removeItem = toBeRendered
      .filter((item) => item.id !== dataItem.id);
    localStorage.setItem('favoriteRecipes', removeItem);
    setToBeRendered(removeItem);
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
