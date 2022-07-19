import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const FAVORITE_ICONS = [whiteHeartIcon, blackHeartIcon];

function FavoriteButton({ dataItem }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteIcons, setFavoriteIcons] = useState();

  const addAsFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const saveOrRemoveFromFavoriteList = (action) => {
    if (action === 'adicionar') {
      console.log(dataItem);
    }
  };

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
}.isRequired;

export default FavoriteButton;
