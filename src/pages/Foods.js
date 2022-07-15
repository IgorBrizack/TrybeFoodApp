import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import context from '../context/Context';
import Header from '../components/Header';
import CardFood from '../components/CardFood';

const NUMBER_INDEX_MEALS = 12;
const NUMBER_INDEX_CATEGORY = 5;

function Foods() {
  const { history } = useHistory();
  const { setIsFoodOrDrink } = useContext(context);
  const [categoryFilter, setCategoryFilter] = useState([]);
  const [inittialFoods, setInittialFoods] = useState([]);

  useEffect(() => {
    async function getFoodsFromAPI() {
      const fetchAPI = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      const data = await fetchAPI.json();
      setInittialFoods(data.meals);
    }
    async function getCategoriesFromAPI() {
      const fetchAPI = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
      const data = await fetchAPI.json();
      setCategoryFilter(data.meals);
    }
    getCategoriesFromAPI();
    getFoodsFromAPI();
    setIsFoodOrDrink('Foods');
  }, []);

  return (
    <div>
      <Header page="Foods" history={ history } />
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
        { inittialFoods[0] && (
          inittialFoods.filter((_meal, index) => index < NUMBER_INDEX_MEALS)
            .map((meal, index) => (
              <div
                key={ meal.idMeal }
                style={ {
                  display: 'flex',
                  justifyContent: 'center',
                  margin: '20px 0',
                  width: '50%',
                } }
              >
                <CardFood meal={ meal } page="foods" index={ index } />
              </div>
            ))
        ) }
      </section>
    </div>
  );
}

export default Foods;
