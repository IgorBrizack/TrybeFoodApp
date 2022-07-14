import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

function Header({ page, history }) {
  const [title, setTitle] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    setTitle(page);
  }, []);

  return (
    <div>
      <button
        data-testid="profile-top-btn"
        type="button"
        onClick={ () => history.push('/profile') }
      >
        <img src="./images/profileIcon.svg" alt="profileicon" />
      </button>
      <button
        data-testid="search-top-btn"
        type="button"
        onClick={ () => setIsSearching(!isSearching) }
      >
        <img src="./images/searchIcon.svg" alt="searchicon" />
      </button>
      <h1>{title}</h1>
      {isSearching && (
        <label htmlFor="searchInput">
          <input
            placeholder="buscar"
            data-testid="search-input"
            name="searchInput"
            id="searchInput"
            type="text"
          />
        </label>)}
    </div>
  );
}

Header.propTypes = {
  history: PropTypes.objectOf(PropTypes.any),
}.isRequired;

export default Header;
