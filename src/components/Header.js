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
        src="./images/profileIcon.svg"
      >
        <img
          src="./images/profileIcon.svg"
          alt="profileIcon"
        />
      </button>
      { page === 'Profile'
        || page === 'Done Recipes' || page === 'Favorite Recipes' ? null : (
          <button
            type="button"
            data-testid="search-top-btn"
            onClick={ () => setIsSearching(!isSearching) }
            src="./images/searchIcon.svg"
          >
            <img
              src="./images/searchIcon.svg"
              alt="searchIcon"
            />
          </button>
        )}

      <h1 data-testid="page-title">{title}</h1>
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
