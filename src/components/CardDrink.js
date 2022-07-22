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
        margin: 'auto',
        padding: '20px',
        width: '70%',
      } }
    >
      <Link to={ `drinks/${drink.id}` }>
        <img
          data-testid={ `${index}-horizontal-image` }
          src={ drink.image }
          alt="drinkCardImg"
          style={ { width: '100%' } }
        />
        <h3
          data-testid={ `${index}-horizontal-name` }
          style={ { textAlign: 'center', fontSize: '18px' } }
        >
          { drink.name }
        </h3>
      </Link>
      <h3
        data-testid={ `${index}-horizontal-top-text` }
        style={ { fontSize: '18px' } }
      >
        { `${drink.alcoholicOrNot} - ${drink.category}` }
      </h3>
      <h3
        data-testid={ `${index}-horizontal-done-date` }
        style={ { fontSize: '18px' } }
      >
        { drink.doneDate }
      </h3>
      { drink.tags
        && (
          drink.tags.map((tag) => (
            <h3
              key={ tag }
              data-testid={ `${index}-${tag}-horizontal-tag` }
              style={ { fontSize: '18px' } }
            >
              { tag }
            </h3>
          ))
        ) }
      <div
        data-testid={ `${index}-horizontal-share-btn` }
      >
        <ShareButton id={ drink.id } type="drinks" />
      </div>
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
