import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import copy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';

function ShareButton() {
  const history = useHistory();
  const [isCopied, setIsCopied] = useState(false);

  const copyFunction = () => {
    copy(`http://localhost:3000${history.location.pathname}`);
    setIsCopied(true);
  };

  return (
    <div>
      <button
        data-testid="share-btn"
        type="button"
        onClick={ () => copyFunction() }
      >
        {isCopied ? (<p>Link copied!</p>) : (
          <img
            src={ shareIcon }
            alt="shareIcon"
          />
        )}
      </button>
    </div>
  );
}

export default ShareButton;
