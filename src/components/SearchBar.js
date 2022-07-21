import React, { useContext, useState } from 'react';
import context from '../context/Context';

function SearchBar() {
  const [searching, setSearching] = useState('');
  const [typeOfSearch, setTypeOfSearch] = useState('');

  const { setToSearch } = useContext(context);

  const execSearch = () => {
    if (typeOfSearch === 'firstLetter' && searching.length > 1) {
      return global.alert('Your search must have only 1 (one) character');
    }
    setToSearch({ search: searching, type: typeOfSearch });
  };

  const handleChange = ({ target }) => {
    if (target.name === 'searchInput') setSearching(target.value);
    if (target.name === 'radioBtnSearch') setTypeOfSearch(target.value);
  };

  return (
    <div>
      <label htmlFor="searchInput">
        <input
          onChange={ (e) => handleChange(e) }
          placeholder="buscar"
          data-testid="search-input"
          name="searchInput"
          id="searchInput"
          type="text"
        />
      </label>
      <label htmlFor="ingredientSearch">
        Ingredient
        <input
          value="ingredient"
          name="radioBtnSearch"
          id="ingredientSearch"
          type="radio"
          data-testid="ingredient-search-radio"
          onClick={ (e) => handleChange(e) }
        />
      </label>
      <label htmlFor="nameSearch">
        Name
        <input
          value="name"
          name="radioBtnSearch"
          id="nameSearch"
          type="radio"
          data-testid="name-search-radio"
          onClick={ (e) => handleChange(e) }
        />
      </label>
      <label htmlFor="firstLetterSearch">
        first Letter
        <input
          value="firstLetter"
          name="radioBtnSearch"
          id="firstLetterSearch"
          type="radio"
          data-testid="first-letter-search-radio"
          onClick={ (e) => handleChange(e) }
        />
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ () => execSearch() }
      >
        Buscar
      </button>
    </div>
  );
}

export default SearchBar;
