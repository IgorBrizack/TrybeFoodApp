import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import context from '../context/Context';
import Header from '../components/Header';
import CardFood from '../components/CardFood';
import Footer from '../components/Footer';
import '../styles/mainSession.css';

const NUMBER_INDEX_MEALS = 12;
const NUMBER_INDEX_CATEGORY = 5;

function Foods() {
  const { setIsFoodOrDrink,
    linkToDetails, dataAPI } = useContext(context);
  const history = useHistory();
  const [categoryFilter, setCategoryFilter] = useState([]);
  const [inittialFoods, setInittialFoods] = useState([]);
  const [filteredBySearch, setFilteredBySearch] = useState({
    isFiltered: false,
    filteredItems: [],
  });
  const [filteredByCategory, setFilteredByCategory] = useState({
    isFiltered: false,
    category: '',
    filteredItems: [],
  });

  useEffect(() => {
    if (Array.isArray(dataAPI) && dataAPI[0]) {
      setFilteredBySearch({
        isFiltered: true,
        filteredItems: [...dataAPI],
      });
    }
  }, [dataAPI]);

  useEffect(() => {
    if (linkToDetails.length > 0) {
      history.push(linkToDetails);
    }
  }, [linkToDetails]);

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
    setFilteredBySearch({
      isFiltered: false,
    });
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
    <>
      <div className="divMain">
        <Header page="Foods" history={ history } />
        <nav className="navigationFilters">
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
                      padding: '1px 1px',
                      width: 'auto',
                    } }
                  >
                    <button
                      data-testid={ `${strCategory}-category-filter` }
                      type="button"
                      className="btn btn-danger"
                      onClick={ () => toggleFilter(strCategory) }
                    >
                      { strCategory }
                    </button>
                  </li>
                ))
            ) }
          </ul>
        </nav>
        { filteredBySearch.isFiltered ? (
          <section
            style={ { display: 'flex', flexWrap: 'wrap', alignItems: 'center' } }
          >
            {
              filteredBySearch.filteredItems
                .filter((_meal, index) => index < NUMBER_INDEX_MEALS)
                .map((mealFiltered, index) => (
                  <div
                    className="recipeSection"
                    key={ mealFiltered.idMeal }
                  >
                    <CardFood meal={ mealFiltered } page="foods" index={ index } />
                  </div>
                ))
            }
          </section>
        ) : (
          <div>
            { filteredByCategory.isFiltered ? (
              <section
                style={ { display: 'flex', flexWrap: 'wrap', alignItems: 'center' } }
              >
                {
                  filteredByCategory.filteredItems
                    .filter((_meal, index) => index < NUMBER_INDEX_MEALS)
                    .map((mealFiltered, index) => (
                      <div
                        className="recipeSection"
                        key={ mealFiltered.idMeal }
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
                        className="recipeSection"
                        key={ meal.idMeal }
                      >
                        <CardFood meal={ meal } page="foods" index={ index } />
                      </div>
                    ))
                ) }
              </section>
            ) }
          </div>
        ) }
      </div>
      <Footer />
    </>
  );
}

export default Foods;
