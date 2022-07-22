import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ShareButton from './ShareButton';
import shareIcon from '../images/shareIcon.svg';

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
      <Link to={ `foods/${meal.id}` }>
        <img
          data-testid={ `${index}-horizontal-image` }
          src={ meal.image }
          alt="mealCardImg"
          style={ { width: '100%' } }
        />
        <p
          data-testid={ `${index}-horizontal-name` }
          style={ { textAlign: 'center', fontSize: '18px' } }
        >
          { meal.name }
        </p>
      </Link>
      <p
        data-testid={ `${index}-horizontal-top-text` }
        style={ { fontSize: '18px' } }
      >
        { `${meal.nationality} - ${meal.category}` }
      </p>
      <p
        data-testid={ `${index}-horizontal-done-date` }
        style={ { fontSize: '18px' } }
      >
        { meal.doneDate }
      </p>
      {
        meal.tags.map((tag) => (
          <p
            key={ tag }
            data-testid={ `${index}-${tag}-horizontal-tag` }
            style={ { fontSize: '18px' } }
          >
            { tag }
          </p>
        ))
      }
      <div
        data-testid={ `${index}-horizontal-share-btn` }
        src={ shareIcon }
      >
        <ShareButton id={ meal.id } type="foods" />
      </div>
    </div>
  );
}

CardFood.propTypes = {
  meal: PropTypes.objectOf(
    PropTypes.any,
  ).isRequired,
  page: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default CardFood;
