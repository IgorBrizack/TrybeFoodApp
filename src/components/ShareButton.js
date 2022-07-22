import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import copy from 'clipboard-copy';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';

function ShareButton({ id, type }) {
  console.log(type);
  const history = useHistory();
  const [isCopied, setIsCopied] = useState(false);

  const copyFunction = () => {
    if (id && type) {
      const str = `http://localhost:3000/${type}/${id}`;
      copy(str);
      return setIsCopied(true);
    }
    if (history.location.pathname.includes('/in-progress')) {
      const str = history.location.pathname.replace('/in-progress', '');
      copy(`http://localhost:3000${str}`);
      setIsCopied(true);
    } else {
      copy(`http://localhost:3000${history.location.pathname}`);
      setIsCopied(true);
    }
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

ShareButton.propTypes = {
  id: PropTypes.string,
  type: PropTypes.string,
};

ShareButton.defaultProps = {
  id: '',
  type: '',
};

export default ShareButton;
