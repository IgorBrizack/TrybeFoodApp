import React from 'react';
// import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
// import SearchBar from './SearchBar';

function Footer() {
  const history = useHistory();

  return (
    <div data-testid="footer">
      <button
        data-testid="drinks-bottom-btn"
        type="button"
        onClick={ () => history.push('/drinks') }
        src="./images/drinkIcon.svg"
      >
        <img
          src="./images/drinkIcon.svg"
          alt="drinkIcon"
        />
      </button>
      <button
        data-testid="food-bottom-btn"
        type="button"
        onClick={ () => history.push('/foods') }
        src="./images/mealIcon.svg"
      >
        <img
          src="./images/mealIcon.svg"
          alt="mealIcon"
        />
      </button>
    </div>
  );
}

// Footer.propTypes = {
//   page: PropTypes.string,
// }.isRequired;

export default Footer;
