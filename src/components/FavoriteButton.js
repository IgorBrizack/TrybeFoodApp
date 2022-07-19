import React from 'react';

const FAVORITE_ICONS = ['./images/whiteHeartIcon.svg', './images/blackHeartIcon.svg'];

function FavoriteButton() {
  // const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div>
      <button
        data-testid="favorite-btn"
        type="button"
        // onClick={()}
      >
        <img
          src={ FAVORITE_ICONS[0] }
          alt="favoriteIcon"
        />
      </button>
    </div>
  );
}

export default FavoriteButton;
