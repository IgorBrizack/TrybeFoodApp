import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import context from '../context/Context';
import Header from '../components/Header';
import CardDrink from '../components/CardDrink';
import Footer from '../components/Footer';

const NUMBER_INDEX_DRINKS = 12;
const NUMBER_INDEX_CATEGORY = 5;

function Drinks() {
  const history = useHistory();
  const { setIsFoodOrDrink,
    linkToDetails, dataAPI } = useContext(context);
  const [categoryFilter, setCategoryFilter] = useState([]);
  const [inittialDrinks, setInittialDrinks] = useState([]);
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
    async function getDrinksFromAPI() {
      const fetchAPI = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      const data = await fetchAPI.json();
      setInittialDrinks(data.drinks);
    }
    async function getCategoriesFromAPI() {
      const fetchAPI = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
      const data = await fetchAPI.json();
      setCategoryFilter([...data.drinks, { strCategory: 'All' }]);
    }
    getCategoriesFromAPI();
    getDrinksFromAPI();
    setIsFoodOrDrink('Drinks');
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
    const fetchAPI = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);
    const data = await fetchAPI.json();
    return setFilteredByCategory({
      isFiltered: true,
      category,
      filteredItems: data.drinks,
    });
  }

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
            categoryFilter
              .filter((category, index) => index < NUMBER_INDEX_CATEGORY
                || category.strCategory === 'All')
              .map(({ strCategory }, index) => (
                <li
                  key={ index }
                  style={ {
                    border: '1px solid black',
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
      { filteredBySearch.isFiltered ? (
        <section
          style={ { display: 'flex', flexWrap: 'wrap', alignItems: 'center' } }
        >
          {
            filteredBySearch.filteredItems
              .filter((_drink, index) => index < NUMBER_INDEX_DRINKS)
              .map((drinkFiltered, index) => (
                <div
                  key={ drinkFiltered.idDrink }
                  style={ {
                    display: 'flex',
                    justifyContent: 'center',
                    margin: '20px 0',
                    width: '50%',
                  } }
                >
                  <CardDrink drink={ drinkFiltered } page="drinks" index={ index } />
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
                  .filter((_drink, index) => index < NUMBER_INDEX_DRINKS)
                  .map((drinkFiltered, index) => (
                    <div
                      key={ drinkFiltered.idDrink }
                      style={ {
                        display: 'flex',
                        justifyContent: 'center',
                        margin: '20px 0',
                        width: '50%',
                      } }
                    >
                      <CardDrink drink={ drinkFiltered } page="drinks" index={ index } />
                    </div>
                  ))
              }
            </section>
          ) : (
            <section
              style={ { display: 'flex', flexWrap: 'wrap', alignItems: 'center' } }
            >
              { inittialDrinks[0] && (
                inittialDrinks.filter((_drink, index) => index < NUMBER_INDEX_DRINKS)
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
          ) }
        </div>
      )}
      <Footer />
    </div>
  );
}

export default Drinks;
