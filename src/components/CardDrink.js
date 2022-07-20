import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ShareButton from './ShareButton';

function CardDrink({ drink, page, index }) {
  if (page === 'drinks') {
    return (
      <div
        data-testid={ `${index}-recipe-card` }
        style={ {
          alignItems: 'center',
          border: '1px solid black',
          display: 'flex',
          flexDirection: 'column',
          padding: '20px',
          width: '50%',
        } }
      >
        <Link to={ `drinks/${drink.idDrink}` }>
          <img
            data-testid={ `${index}-card-img` }
            src={ drink.strDrinkThumb }
            alt="drinkCardImg"
            style={ { width: '100%' } }
          />
          <h3
            style={ { textAlign: 'center' } }
            data-testid={ `${index}-card-name` }
          >
            { drink.strDrink }
          </h3>
        </Link>
      </div>
    );
  }
  return (
    <div
      style={ {
        alignItems: 'center',
        border: '1px solid black',
        display: 'flex',
        flexDirection: 'column',
        padding: '20px',
        width: '20%',
      } }
    >
      <img
        data-testid={ `${index}-horizontal-image` }
        src={ drink.image }
        alt="drinkCardImg"
        style={ { width: '100%' } }
      />
      <h3
        data-testid={ `${index}-horizontal-top-text` }
      >
        { drink.category }
      </h3>
      <h3
        data-testid={ `${index}-horizontal-name"` }
        style={ { textAlign: 'center' } }
      >
        { drink.name }
      </h3>
      <h3
        data-testid={ `${index}-horizontal-done-date"` }
      >
        { drink.doneDate }
      </h3>
      <div
        data-testid={ `${index}-horizontal-share-btn` }
      >
        <ShareButton />
      </div>
      { drink.tags
        && (
          drink.tags.map((tag) => (
            <h3
              key={ tag }
              data-testid={ `${index}-${tag}-horizontal-tag` }
            >
              { tag }
            </h3>
          ))
        ) }
    </div>
  );
}

CardDrink.propTypes = {
  drink: PropTypes.objectOf(
    PropTypes.any,
  ).isRequired,
  page: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default CardDrink;
