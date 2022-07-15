import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import context from '../context/Context';
import Header from '../components/Header';
import CardDrink from '../components/CardDrink';

const NUMBER_INDEX = 12;
const NUMBER_INDEX_CATEGORY = 5;

function Drinks() {
  const { history } = useHistory();
  const { setIsFoodOrDrink } = useContext(context);
  const [categoryFilter, setCategoryFilter] = useState([]);
  const [inittialDrinks, setInittialDrinks] = useState([]);

  useEffect(() => {
    async function getDrinksFromAPI() {
      const fetchAPI = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      const data = await fetchAPI.json();
      setInittialDrinks(data.drinks);
    }
    async function getCategoriesFromAPI() {
      const fetchAPI = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
      const data = await fetchAPI.json();
      setCategoryFilter(data.drinks);
    }
    getCategoriesFromAPI();
    getDrinksFromAPI();
    setIsFoodOrDrink('Drinks');
  }, []);

  return (
    <div>
      <Header page="Drinks" history={ history } />
      <nav>
        <ul
          style={ {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            listStyle: 'none',
            paddingInlineStart: '0',
          } }
        >
          { categoryFilter[0] && (
            categoryFilter.filter((_category, index) => index < NUMBER_INDEX_CATEGORY)
              .map(({ strCategory }) => (
                <li
                  data-testid={ `${strCategory}-category-filter` }
                  key={ strCategory }
                  style={ {
                    border: '1px solid black',
                    textAlign: 'center',
                    width: '50%',
                  } }
                >
                  { strCategory }
                </li>
              ))
          ) }
        </ul>
      </nav>
      <section
        style={ { display: 'flex', flexWrap: 'wrap', alignItems: 'center' } }
      >
        { inittialDrinks[0] && (
          inittialDrinks.filter((_drink, index) => index < NUMBER_INDEX)
            .map((drink, index) => (
              <div
                key={ drink.idDrink }
                style={ {
                  display: 'flex',
                  justifyContent: 'center',
                  margin: '20px 0',
                  width: '50%',
                } }
              >
                <CardDrink drink={ drink } page="drinks" index={ index } />
              </div>
            ))
        ) }
      </section>
    </div>
  );
}

export default Drinks;
