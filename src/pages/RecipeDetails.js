import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import context from '../context/Context';
import CarouselFadeExample from '../components/Carousel';
import ShareButton from '../components/ShareButton';
import FavoriteButton from '../components/FavoriteButton';

const MEALS_DETAILS_ENDPOINT = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
const DRINKS_DETAILS_ENDPOINT = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';
const DRINKS_TO_RECOMMEND_ENDPOINT = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const MEALS_TO_RECOMMEND_ENDPOINT = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const QTD_INGREDIENTS = 20;
const ONE = 1;

function RecipeDetails() {
  const { setRecommended } = useContext(context);
  const history = useHistory();
  const [dataItem, setDataItem] = useState([]);
  const [isFoodOrDrinkDetails, setIsFoodOrDrinkDetails] = useState('');
  const [ingredientData, setIngredientData] = useState();
  const [isInProgress, setIsInProgress] = useState(false);
  useEffect(() => {
    if (localStorage.getItem('inProgressRecipes')) {
      const storageItems = JSON.parse(localStorage.getItem('inProgressRecipes'));
      if (history.location.pathname.includes('foods') && dataItem[0]) {
        setIsInProgress(Object.keys(storageItems.meals)
          .includes(dataItem[0].idMeal));
      } if (history.location.pathname.includes('drinks') && dataItem[0]) {
        setIsInProgress(Object.keys(storageItems.cocktails)
          .includes(dataItem[0].idDrink));
      }
    }
  }, [dataItem]);
  const recommendedItems = async (type) => {
    let recommendation = '';
    if (type === 'foods') {
      recommendation = await fetch(MEALS_TO_RECOMMEND_ENDPOINT)
        .then((response) => response.json());
      setRecommended(recommendation.meals);
    } else {
      recommendation = await fetch(DRINKS_TO_RECOMMEND_ENDPOINT)
        .then((response) => response.json());
      setRecommended(recommendation.drinks);
    }
  };
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
      recommendedItems('drinks');
    } else {
      resultsDetailAPI = await fetch(`${DRINKS_DETAILS_ENDPOINT}${pathNameData
        .replace(/\D/gim, '')}`).then((response) => response.json());
      setDataItem(resultsDetailAPI.drinks);
      setIsFoodOrDrinkDetails('drinks');
      recommendedItems('foods');
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
    <div className="detailsItem">
      { isFoodOrDrinkDetails === 'foods' && (dataItem.map((value, index) => (
        <div
          style={ {
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
            padding: '20px',
            width: '100%',
          } }
          key={ index }
        >
          <div className="btnsShareFavorite">
            <ShareButton />
            <FavoriteButton dataItem={ dataItem } type="Foods" />
          </div>
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
            autoPlay={ ONE }
            title="video tutorial"
            width="300"
            height="220"
            scrolling="no"
            src={ value.strYoutube }
          />
          <div className="separator" />
          <CarouselFadeExample />
          <div className="separator" />
          {isInProgress ? (
            <button
              style={ { position: 'fixed', bottom: '0px' } }
              type="button"
              data-testid="start-recipe-btn"
              className="btn btn-danger"
              onClick={ () => history.push(`/foods/${dataItem[0].idMeal}/in-progress`) }
            >
              Continue Recipe
            </button>
          ) : (
            <button
              style={ { position: 'fixed', bottom: '0px' } }
              type="button"
              data-testid="start-recipe-btn"
              className="btn btn-danger"
              onClick={ () => history.push(`/foods/${dataItem[0].idMeal}/in-progress`) }
            >
              Start Recipe
            </button>
          )}
        </div>
      )))}
      { isFoodOrDrinkDetails === 'drinks' && (dataItem.map((value, index) => (
        <div
          style={ {
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
            padding: '20px',
            width: '100%',
          } }
          key={ index }
        >
          <div className="btnsShareFavorite">
            <ShareButton />
            <FavoriteButton dataItem={ dataItem } type="Drinks" />
          </div>
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
          <div className="separator" />
          <CarouselFadeExample />
          <div className="separator" />
          {isInProgress ? (
            <button
              style={ { position: 'fixed', bottom: '0px' } }
              type="button"
              data-testid="start-recipe-btn"
              onClick={ () => history.push(`/drinks/${dataItem[0].idDrink}/in-progress`) }
              className="btn btn-danger"
            >
              Continue Recipe
            </button>
          ) : (
            <button
              style={ { position: 'fixed', bottom: '0px' } }
              type="button"
              data-testid="start-recipe-btn"
              onClick={ () => history.push(`/drinks/${dataItem[0].idDrink}/in-progress`) }
              className="btn btn-danger"
            >
              Start Recipe
            </button>
          )}
        </div>
      )))}
    </div>
  );
}

export default RecipeDetails;
