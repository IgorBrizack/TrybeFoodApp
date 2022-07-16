import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

const MEALS_DETAILS_ENDPOINT = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
const DRINKS_DETAILS_ENDPOINT = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';
const QTD_INGREDIENTS = 20;
const ZERO = 0;

function RecipeDetails() {
  const history = useHistory();
  const [dataItem, setDataItem] = useState([]);
  const [isFoodOrDrinkDetails, setIsFoodOrDrinkDetails] = useState('');
  const [ingredientData, setIngredientData] = useState();

  const fetchItemDetails = async () => {
    let resultsDetailAPI = '';
    const pathNameData = history.location.pathname;
    // A função replace utilizada nos dados do PathName da página está sendo utilizado para retirar apenas os valores númericos existentes, esses valores determina o endpoint de busca na API;
    // https://pt.stackoverflow.com/questions/3719/como-obter-apenas-os-n%C3%BAmeros-de-uma-string-em-javascript
    if (pathNameData.includes('foods')) {
      resultsDetailAPI = await fetch(`${MEALS_DETAILS_ENDPOINT}${pathNameData
        .replace(/\D/gim, '')}`).then((response) => response.json());
      setDataItem(resultsDetailAPI.meals);
      setIsFoodOrDrinkDetails('foods');
    } else {
      resultsDetailAPI = await fetch(`${DRINKS_DETAILS_ENDPOINT}${pathNameData
        .replace(/\D/gim, '')}`).then((response) => response.json());
      setDataItem(resultsDetailAPI.drinks);
      setIsFoodOrDrinkDetails('drinks');
    }
  };

  const organizeIngredientsData = () => {
    const ingredients = [];
    for (let index = 1; index <= QTD_INGREDIENTS; index += 1) {
      if (dataItem[0][`strIngredient${index}`]) {
        ingredients.push({
          ingredient: dataItem[0][`strIngredient${index}`],
          measure: dataItem[0][`strMeasure${index}`] });
      }
    }
    setIngredientData(ingredients);
  };

  useEffect(() => {
    if (dataItem.length > 0) organizeIngredientsData();
  }, [dataItem]);

  useEffect(() => (
    fetchItemDetails()
  ), []);

  return (
    <div>
      { isFoodOrDrinkDetails === 'foods' && (dataItem.map((value, index) => (
        <div
          style={ {
            alignItems: 'center',
            border: '1px solid black',
            display: 'flex',
            flexDirection: 'column',
            padding: '20px',
            width: '50%',
          } }
          key={ index }
        >
          <img
            style={ { width: '40%' } }
            src={ value.strMealThumb }
            alt={ `food ${value.idFood}` }
            data-testid="recipe-photo"
          />
          <h1 data-testid="recipe-title">{value.strMeal}</h1>
          <p data-testid="recipe-category">{value.strCategory}</p>
          <div>
            {ingredientData.map((valueIngredient, indexIng) => (
              <div
                style={ {
                  display: 'flex',
                } }
                key={ indexIng }
              >
                <p data-testid={ `${indexIng}-ingredient-name-and-measure` }>
                  {valueIngredient
                    .ingredient}
                </p>
                <p
                  data-testid={ `${indexIng}-ingredient-name-and-measure` }
                >
                  {valueIngredient.measure}
                </p>
              </div>
            ))}
          </div>
          <p data-testid="instructions">
            {value.strInstructions}
          </p>
          <iframe
            data-testid="video"
            autoPlay={ ZERO }
            title="video tutorial"
            width="420"
            height="315"
            src={ value.strYoutube }
          />
          <p data-testid={ `${index}-recomendation-card` }>recomendações</p>
        </div>
      )))}
      { isFoodOrDrinkDetails === 'drinks' && (dataItem.map((value, index) => (
        <div
          style={ {
            alignItems: 'center',
            border: '1px solid black',
            display: 'flex',
            flexDirection: 'column',
            padding: '20px',
            width: '50%',
          } }
          key={ index }
        >
          <img
            style={ { width: '40%' } }
            src={ value.strDrinkThumb }
            alt={ `food ${value.idDrink}` }
            data-testid="recipe-photo"
          />
          <h1 data-testid="recipe-title">{value.strDrink}</h1>
          {value.strAlcoholic && (
            <p data-testid="recipe-category">{value.strAlcoholic}</p>
          )}
          <div>
            {ingredientData.map((valueIngredient, indexIng2) => (
              <div
                style={ {
                  display: 'flex',
                } }
                key={ indexIng2 }
              >
                <p
                  data-testid={ `${indexIng2}-ingredient-name-and-measure` }
                >
                  {valueIngredient.ingredient}
                </p>
                <p
                  data-testid={ `${indexIng2}-ingredient-name-and-measure` }
                >
                  {valueIngredient.measure}
                </p>
              </div>
            ))}
          </div>
          <p data-testid="instructions">
            {value.strInstructions}
          </p>
          <p data-testid={ `${index}-recomendation-card` }>recomendações</p>
        </div>
      )))}
    </div>
  );
}

export default RecipeDetails;
