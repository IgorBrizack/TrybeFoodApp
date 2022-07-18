import React from 'react';
import { useLocation } from 'react-router-dom';

function RecipeInProgress() {
  const location = useLocation();
  const { dataItem, dataIngredients } = location.state;
  if (dataItem[0].idMeal) {
    const item = dataItem[0];
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
        <p data-testid="recipe-category">{item.strCategory}</p>
        <div>
          {dataIngredients.map((valueIngredient, indexIng) => (
            <div
              style={ {
                display: 'flex',
              } }
              key={ indexIng }
            >
              <p data-testid={ `${indexIng}-ingredient-step` }>
                {`${valueIngredient.ingredient} ${valueIngredient.measure}`}
              </p>
            </div>
          ))}
          <p data-testid="instructions">
            {item.strInstructions}
          </p>
          <button
            style={ { position: 'fixed', bottom: '0px' } }
            type="button"
            data-testid="finish-recipe-btn"
          >
            Finish Recipe
          </button>
        </div>

      </div>
    );
  }
  return (
    <div>Drinks</div>
  );
}

export default RecipeInProgress;
