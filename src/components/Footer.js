import React from 'react';
import { useHistory } from 'react-router-dom';

function Footer() {
  const history = useHistory();

  return (
    <div data-testid="footer" className="footer">
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

export default Footer;
