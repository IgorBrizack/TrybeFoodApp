import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function CardFood({ meal, page, index }) {
  if (page === 'foods') {
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
        <Link to={ `foods/${meal.idMeal}` }>
          <img
            data-testid={ `${index}-card-img` }
            src={ meal.strMealThumb }
            alt="mealCardImg"
            style={ { width: '100%' } }
          />
          <h3
            data-testid={ `${index}-card-name` }
            style={ { textAlign: 'center' } }
          >
            { meal.strMeal }
          </h3>
        </Link>
      </div>
    );
  }
}

CardFood.propTypes = {
  meal: PropTypes.objectOf(
    PropTypes.any,
  ).isRequired,
  page: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default CardFood;
