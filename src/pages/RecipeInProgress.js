import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import ShareButton from '../components/ShareButton';
import FavoriteButton from '../components/FavoriteButton';
import { setRecipesMeal, setRecipesDrink } from '../helpers/setDoneRecipes';

const QTD_INGREDIENTS = 20;

function RecipeInProgress({ match }) {
  const history = useHistory();
  const [item, setItem] = useState();
  const [checked, setChecked] = useState([]);
  const [dataIngredients, setDataIngredients] = useState();
  async function getFood() {
    const fetchAPI = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${match.params.id}`);
    const data = await fetchAPI.json();
    setItem(data.meals[0]);
  }
  async function getDrink() {
    const fetchAPI = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${match.params.id}`);
    const data = await fetchAPI.json();
    setItem(data.drinks[0]);
  }
  function setInittialStorage(checks) {
    const storage = localStorage;
    if (!storage.getItem('inProgressRecipes')) {
      if (item.idMeal) {
        const objStorage = { cocktails: {}, meals: { [item.idMeal]: checks } };
        return storage.setItem('inProgressRecipes', JSON.stringify(objStorage));
      }
      const objStorage = {
        cocktails: { [item.idDrink]: checks },
        meals: {},
      };
      return storage.setItem('inProgressRecipes', JSON.stringify(objStorage));
    }
    const objStorageIn = JSON.parse(storage.getItem('inProgressRecipes'));
    if (item.idMeal) {
      if (!Object.keys(JSON
        .parse(storage.getItem('inProgressRecipes')).meals).includes(item.idMeal)) {
        const objStorage = { cocktails: { ...objStorageIn.cocktails },
          meals: { ...objStorageIn.meals, [item.idMeal]: checks },
        };
        return storage.setItem('inProgressRecipes', JSON.stringify(objStorage));
      }
      return null;
    }
    if (!Object.keys(JSON
      .parse(storage.getItem('inProgressRecipes')).cocktails).includes(item.idDrink)) {
      const objStorage = {
        cocktails: { ...objStorageIn.cocktails, [item.idDrink]: checks },
        meals: { ...objStorageIn.meals },
      };
      return storage.setItem('inProgressRecipes', JSON.stringify(objStorage));
    }
  }
  function organizeIngredientsData() {
    const ingredients = [];
    const checks = [];
    for (let index = 1; index <= QTD_INGREDIENTS; index += 1) {
      if (item[`strIngredient${index}`]) {
        ingredients.push({ ingredient: item[`strIngredient${index}`],
          measure: item[`strMeasure${index}`] });
        checks.push(false);
      }
    }
    setDataIngredients(ingredients);
    setChecked(checks);
    setInittialStorage(checks);
  }
  function checkStorageData() {
    if (localStorage.getItem('inProgressRecipes') && item) {
      const objStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
      if (item.idMeal && Object.keys(objStorage.meals).includes(item.idMeal)) {
        return setChecked(objStorage.meals[item.idMeal]);
      }
      return setChecked(objStorage.cocktails[item.idDrink]);
    }
  }
  useEffect(() => {
    if (match.path.includes('foods')) return getFood();
    return getDrink();
  }, []);
  useEffect(() => {
    if (item) {
      organizeIngredientsData();
      checkStorageData();
    }
  }, [item]);
  function saveChecked(indexIng) {
    const newChecked = checked.map((bool, index) => {
      if (index === indexIng) return !bool;
      return bool;
    });
    setChecked(newChecked);
    const storage = localStorage;
    if (item.idMeal) {
      const obj = JSON.parse(storage.getItem('inProgressRecipes'));
      const newObj = { ...obj, meals: { ...obj.meals, [item.idMeal]: newChecked } };
      return storage.setItem('inProgressRecipes', JSON.stringify(newObj));
    }
    const obj = JSON.parse(storage.getItem('inProgressRecipes'));
    const newObj = { ...obj,
      cocktails: { ...obj.cocktails, [item.idDrink]: newChecked },
    };
    return storage.setItem('inProgressRecipes', JSON.stringify(newObj));
  }
  function handleDoneRecipes(type) {
    const date = new Date().toLocaleDateString();
    if (type === 'Foods') {
      setRecipesMeal(item, date);
      return history.push('/done-recipes');
    }
    setRecipesDrink(item, date);
    history.push('/done-recipes');
  }
  if (dataIngredients && item) {
    if (match.path.includes('foods')) {
      return (
        <div
          style={ { alignItems: 'center',
            border: '1px solid black',
            display: 'flex',
            flexDirection: 'column',
            padding: '20px',
            width: '50%',
          } }
        >
          <img
            style={ { width: '40%' } }
            src={ item.strMealThumb }
            alt={ `food ${item.idFood}` }
            data-testid="recipe-photo"
          />
          <h1 data-testid="recipe-title">{item.strMeal}</h1>
          <ShareButton />
          <FavoriteButton dataItem={ [item] } type="Foods" />
          <p data-testid="recipe-category">{item.strCategory}</p>
          <div>
            {dataIngredients.map((valueIngredient, indexIng) => (
              <div
                style={ {
                  display: 'flex',
                } }
                key={ indexIng }
              >
                <label
                  htmlFor={ `${valueIngredient.ingredient}-checkbox` }
                  data-testid={ `${indexIng}-ingredient-step` }
                  style={ {
                    textDecoration: checked[indexIng] ? 'line-through' : 'none',
                  } }
                >
                  <input
                    id={ `${valueIngredient.ingredient}-checkbox` }
                    type="checkbox"
                    onChange={ () => saveChecked(indexIng) }
                    checked={ checked[indexIng] }
                  />
                  {`${valueIngredient.ingredient} ${valueIngredient.measure}`}
                </label>
              </div>
            ))}
            <p data-testid="instructions">
              {item.strInstructions}
            </p>
            <button
              style={ { position: 'fixed', bottom: '0px' } }
              type="button"
              data-testid="finish-recipe-btn"
              onClick={ () => handleDoneRecipes('Foods') }
              disabled={ !checked.every((bool) => bool === true) }
            >
              Finish Recipe
            </button>
          </div>
        </div>
      );
    }
    return (
      <div
        style={ { alignItems: 'center',
          border: '1px solid black',
          display: 'flex',
          flexDirection: 'column',
          padding: '20px',
          width: '50%',
        } }
      >
        <img
          style={ { width: '40%' } }
          src={ item.strDrinkThumb }
          alt={ `food ${item.idDrink}` }
          data-testid="recipe-photo"
        />
        <h1 data-testid="recipe-title">{item.strDrink}</h1>
        <ShareButton />
        <FavoriteButton dataItem={ [item] } type="Drinks" />
        <p data-testid="recipe-category">{item.strAlcoholic}</p>
        <div>
          {dataIngredients.map(({ ingredient, measure }, indexIng) => (
            <div
              style={ { display: 'flex' } }
              key={ indexIng }
            >
              <label
                htmlFor={ `${ingredient}-checkbox` }
                data-testid={ `${indexIng}-ingredient-step` }
                style={ {
                  textDecoration: checked[indexIng] ? 'line-through' : 'none',
                } }
              >
                <input
                  id={ `${ingredient}-checkbox` }
                  type="checkbox"
                  onChange={ () => saveChecked(indexIng) }
                  checked={ checked[indexIng] }
                />
                {`${ingredient} ${measure}`}
              </label>
            </div>
          ))}
          <p data-testid="instructions">
            {item.strInstructions}
          </p>
          <button
            style={ { position: 'fixed', bottom: '0px' } }
            type="button"
            data-testid="finish-recipe-btn"
            onClick={ () => handleDoneRecipes('Drinks') }
            disabled={ !checked.every((bool) => bool === true) }
          >
            Finish Recipe
          </button>
        </div>
      </div>
    );
  }
  return null;
}
RecipeInProgress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.objectOf(
      PropTypes.string.isRequired,
    ).isRequired,
    path: PropTypes.string.isRequired,
  }).isRequired,
};
export default RecipeInProgress;
