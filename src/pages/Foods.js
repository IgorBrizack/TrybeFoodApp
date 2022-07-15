import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import context from '../context/Context';
import Header from '../components/Header';
import CardFood from '../components/CardFood';
import Footer from '../components/Footer';

const NUMBER_INDEX_MEALS = 12;
const NUMBER_INDEX_CATEGORY = 5;

function Foods() {
  const history = useHistory();
  const { setIsFoodOrDrink } = useContext(context);
  const [categoryFilter, setCategoryFilter] = useState([]);
  const [inittialFoods, setInittialFoods] = useState([]);
  const [filteredByCategory, setFilteredByCategory] = useState({
    isFiltered: false,
    category: '',
    filteredItems: [],
  });

  useEffect(() => {
    async function getFoodsFromAPI() {
      const fetchAPI = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      const data = await fetchAPI.json();
      setInittialFoods(data.meals);
    }
    async function getCategoriesFromAPI() {
      const fetchAPI = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
      const data = await fetchAPI.json();
      setCategoryFilter([...data.meals, { strCategory: 'All' }]);
    }
    getCategoriesFromAPI();
    getFoodsFromAPI();
    setIsFoodOrDrink('Foods');
  }, []);

  async function toggleFilter(category) {
    if (category === 'All') {
      return setFilteredByCategory({
        isFiltered: false,
        category: '',
        filteredItems: [],
      });
    }
    if (filteredByCategory.isFiltered && category === filteredByCategory.category) {
      return setFilteredByCategory({
        isFiltered: false,
        category: '',
        filteredItems: [],
      });
    }
    const fetchAPI = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    const data = await fetchAPI.json();
    return setFilteredByCategory({
      isFiltered: true,
      category,
      filteredItems: data.meals,
    });
  }

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
            categoryFilter
              .filter((category, index) => index < NUMBER_INDEX_CATEGORY
                || category.strCategory === 'All')
              .map(({ strCategory }) => (
                <li
                  key={ strCategory }
                  style={ {
                    textAlign: 'center',
                    width: '50%',
                  } }
                >
                  <button
                    data-testid={ `${strCategory}-category-filter` }
                    type="button"
                    style={ {
                      border: '1px solid black',
                      textAlign: 'center',
                      width: '100%',
                    } }
                    onClick={ () => toggleFilter(strCategory) }
                  >
                    { strCategory }
                  </button>
                </li>
              ))
          ) }
        </ul>
      </nav>
      { filteredByCategory.isFiltered ? (
        <section
          style={ { display: 'flex', flexWrap: 'wrap', alignItems: 'center' } }
        >
          {
            filteredByCategory.filteredItems
              .filter((_meal, index) => index < NUMBER_INDEX_MEALS)
              .map((mealFiltered, index) => (
                <div
                  key={ mealFiltered.idMeal }
                  style={ {
                    display: 'flex',
                    justifyContent: 'center',
                    margin: '20px 0',
                    width: '50%',
                  } }
                >
                  <CardFood meal={ mealFiltered } page="foods" index={ index } />
                </div>
              ))
          }
        </section>
      ) : (
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
      ) }
      <Footer />
    </div>
  );
}

export default Foods;
