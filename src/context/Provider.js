import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import context from './Context';

const INGREDIENT_ENDPOINT_MEAL = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=';
const NAME_ENDPOINT_MEAL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const FIRST_LETTER_ENDPOINT_MEAL = 'https://www.themealdb.com/api/json/v1/1/search.php?f=';

const INGREDIENT_ENDPOINT_DRINK = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=';
const NAME_ENDPOINT_DRINK = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const FIRST_LETTER_ENDPOINT_DRINK = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=';

function Provider({ children }) {
  const [toSearch, setToSearch] = useState({ search: '', type: '' });
  const [dataAPI, setDataApi] = useState([]);
  const [isFoodOrDrink, setIsFoodOrDrink] = useState('');
  const [linkToDetails, setLinkToDetails] = useState('');
  const [recommended, setRecommended] = useState();

  // Essa condicional se aplica quando há apenas um item quando é feita a busca na Api, dessa forma ela deve ser redirecionada a página de detalhes do item em questão de forma imediata.
  const isOnlyOneItem = (response) => {
    if (!response) {
      global
        .alert('Sorry, we haven\'t found any recipes for these filters.');
      setDataApi([]);
    } else {
      if (response.length === 1 && isFoodOrDrink === 'Foods') {
        setLinkToDetails(`/foods/${response[0].idMeal}`);
      }
      if (response.length === 1 && isFoodOrDrink === 'Drinks') {
        setLinkToDetails(`/drinks/${response[0].idDrink}`);
      }
    }
  };

  const requestDataFromApi = async () => {
    const { search, type } = toSearch;
    switch (type) {
    case 'ingredient': {
      let ingredientResponse = '';
      if (isFoodOrDrink === 'Foods') {
        ingredientResponse = await fetch(`${INGREDIENT_ENDPOINT_MEAL}${search}`)
          .then((response) => response.json());
        setDataApi(ingredientResponse.meals);
        isOnlyOneItem(ingredientResponse.meals);
      } else {
        ingredientResponse = await fetch(`${INGREDIENT_ENDPOINT_DRINK}${search}`)
          .then((response) => response.json().catch((error) => error));
        setDataApi(ingredientResponse.drinks);
        isOnlyOneItem(ingredientResponse.drinks);
      }
    }
      break;
    case 'name': {
      let nameResponse = '';
      if (isFoodOrDrink === 'Foods') {
        nameResponse = await fetch(`${NAME_ENDPOINT_MEAL}${search}`)
          .then((response) => response.json());
        setDataApi(nameResponse.meals);
        isOnlyOneItem(nameResponse.meals);
      } else {
        nameResponse = await fetch(`${NAME_ENDPOINT_DRINK}${search}`)
          .then((response) => response.json());
        setDataApi(nameResponse.drinks);
        isOnlyOneItem(nameResponse.drinks);
      }
    }
      break;
    default: {
      let firstLetterResponse = '';
      if (isFoodOrDrink === 'Foods') {
        firstLetterResponse = await fetch(`${FIRST_LETTER_ENDPOINT_MEAL}${search}`)
          .then((response) => response.json());
        setDataApi(firstLetterResponse.meals);
        isOnlyOneItem(firstLetterResponse.meals);
      } else {
        firstLetterResponse = await fetch(`${FIRST_LETTER_ENDPOINT_DRINK}${search}`)
          .then((response) => response.json());
        setDataApi(firstLetterResponse.drinks);
        isOnlyOneItem(firstLetterResponse.drinks);
      }
    }
    }
  };

  useEffect(() => {
    if (toSearch.search.length > 0) requestDataFromApi();
  }, [toSearch]);

  const providerState = {
    setToSearch,
    setIsFoodOrDrink,
    setRecommended,
    linkToDetails,
    dataAPI,
    recommended,
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
