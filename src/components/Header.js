import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import SearchBar from './SearchBar';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import '../styles/header.css';

function Header({ page }) {
  const history = useHistory();
  const [title, setTitle] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    setTitle(page);
  }, []);

  return (
    <div className="divHeader">
      <button
        data-testid="profile-top-btn"
        type="button"
        src={ profileIcon }
        onClick={ () => history.push('/profile') }
        className="btn btn-danger"
      >
        <img
          src={ profileIcon }
          alt="profileIcon"
        />
      </button>
      <h1 className="titleSection" data-testid="page-title">{title}</h1>
      { page === 'Profile'
        || page === 'Done Recipes' || page === 'Favorite Recipes' ? null : (
          <button
            type="button"
            data-testid="search-top-btn"
            src={ searchIcon }
            onClick={ () => setIsSearching(!isSearching) }
            className="btn btn-danger"
          >
            <img
              src={ searchIcon }
              alt="searchIcon"
            />
          </button>
        )}

      {isSearching && <SearchBar /> }
    </div>
  );
}

Header.propTypes = {
  page: PropTypes.string,
}.isRequired;

export default Header;
