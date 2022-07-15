import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import context from './Context';

const INGREDIENT_ENDPOINT = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=';
const NAME_ENDPOINT = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const FIRST_LETTER_ENDPOINT = 'https://www.themealdb.com/api/json/v1/1/search.php?f=';

function Provider({ children }) {
  const [toSearch, setToSearch] = useState({ search: '', type: '' });
  const [dataAPI, setDataApi] = useState([]);

  const requestDataFromApi = async () => {
    const { search, type } = toSearch;
    switch (type) {
    case 'ingredient': {
      console.log('entrei no ingrediente');
      const ingredientResponse = await fetch(`${INGREDIENT_ENDPOINT}${search}`)
        .then((response) => response.json());
      setDataApi(ingredientResponse.meals);
    }
      break;
    case 'name': {
      console.log('entrei no name');
      const nameResponse = await fetch(`${NAME_ENDPOINT}${search}`)
        .then((response) => response.json());
      setDataApi(nameResponse.meals);
    }
      break;
    case 'firstLetter': {
      console.log('entrei no firsLetter');
      const firstLetterResponse = await fetch(`${FIRST_LETTER_ENDPOINT}${search}`)
        .then((response) => response.json());
      setDataApi(firstLetterResponse.meals);
    }
      break;
    default:
      setDataApi([]);
    }
  };

  useEffect(() => {
    console.log(dataAPI);
  }, [dataAPI]);

  useEffect(() => {
    if (toSearch.search.length > 0) requestDataFromApi();
  }, [toSearch]);

  const providerState = {
    setToSearch,
  };

  return (
    <context.Provider value={ providerState }>
      {children}
    </context.Provider>
  );
}

Provider.propTypes = {
  children: propTypes.string,
}.isrequired;

export default Provider;
