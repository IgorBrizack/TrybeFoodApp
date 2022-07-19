import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

const QTD_INGREDIENTS = 20;

function RecipeInProgress({ match }) {
  const history = useHistory();
  const [item, setItem] = useState();
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
  function organizeIngredientsData() {
    const ingredients = [];
    for (let index = 1; index <= QTD_INGREDIENTS; index += 1) {
      if (item[`strIngredient${index}`]) {
        ingredients.push({
          ingredient: item[`strIngredient${index}`],
          measure: item[`strMeasure${index}`] });
      }
    }
    setDataIngredients(ingredients);
  }
  useEffect(() => {
    if (match.path.includes('foods')) {
      return getFood();
    }
    return getDrink();
  }, []);
  useEffect(() => {
    if (item) {
      organizeIngredientsData();
    }
  }, [item]);
  if (dataIngredients && item) {
    if (match.path.includes('foods')) {
      return (
        <div
          style={ {
            alignItems: 'center',
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
          <button type="button" data-testid="share-btn">Compartilhar</button>
          <button type="button" data-testid="favorite-btn">Favoritar</button>
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
                >
                  <input
                    id={ `${valueIngredient.ingredient}-checkbox` }
                    type="checkbox"
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
              onClick={ () => history.push(`/foods/${item.idMeal}`) }
            >
              Finish Recipe
            </button>
          </div>
        </div>
      );
    }
    return (
      <div
        style={ {
          alignItems: 'center',
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
        <button type="button" data-testid="share-btn">Compartilhar</button>
        <button type="button" data-testid="favorite-btn">Favoritar</button>
        <p data-testid="recipe-category">{item.strAlcoholic}</p>
        <div>
          {dataIngredients.map(({ ingredient, measure }, indexIng) => (
            <div
              style={ {
                display: 'flex',
              } }
              key={ indexIng }
            >
              <label
                htmlFor={ `${ingredient}-checkbox` }
                data-testid={ `${indexIng}-ingredient-step` }
              >
                <input
                  id={ `${ingredient}-checkbox` }
                  type="checkbox"
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
            onClick={ () => history.push(`/drinks/${item.idDrink}`) }
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
