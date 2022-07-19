import React from 'react';
import { useHistory } from 'react-router-dom';

const copy = require('clipboard-copy');

function ShareButton() {
  const history = useHistory();

  const copyFunction = () => {
    global.alert('Link copied!');
    copy(history.location.pathname);
  };
  return (
    <div>
      <button
        data-testid="share-btn"
        type="button"
        onClick={ () => copyFunction() }
      >
        <img
          src="./images/shareIcon.svg"
          alt="shareIcon"
        />
      </button>
    </div>
  );
}

export default ShareButton;
