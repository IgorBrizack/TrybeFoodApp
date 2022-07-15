import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

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
}

CardDrink.propTypes = {
  drink: PropTypes.objectOf(
    PropTypes.any,
  ).isRequired,
  page: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default CardDrink;
