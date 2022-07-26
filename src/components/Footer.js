import React from 'react';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  const history = useHistory();

  return (
    <div data-testid="footer" className="footer">
      <div className="insideFooter">
        <button
          data-testid="drinks-bottom-btn"
          type="button"
          onClick={ () => history.push('/drinks') }
          src={ drinkIcon }
          className="btn btn-danger"
        >
          <img
            src={ drinkIcon }
            alt="drinkIcon"
          />
        </button>
        <button
          data-testid="food-bottom-btn"
          type="button"
          onClick={ () => history.push('/foods') }
          src="./images/mealIcon.svg"
          className="btn btn-danger"
        >
          <img
            src={ mealIcon }
            alt="mealIcon"
          />
        </button>
      </div>
    </div>
  );
}

export default Footer;
