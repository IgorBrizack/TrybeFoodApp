export function factorTags(tags) {
  if (!tags) {
    return [];
  }
  if (tags.includes(', ')) {
    return tags.split(', ');
  }
  return [tags];
}

export function checkIfAlcoholic(str) {
  if (str === 'Alcoholic') {
    return 'Alcoholic';
  } if (str === 'Non alcoholic') {
    return 'Non alcoholic';
  }
  return 'Optional alcohol';
}

export function getDate(date) {
  const d = date.split('/');
  const dat = `${d[1]}/${d[0]}/${d[2]}`;
  return dat;
}

export function setRecipesMeal(item, date) {
  const storage = localStorage;
  if (!storage.getItem('doneRecipes')) {
    const objStorage = {
      id: item.idMeal,
      type: 'food',
      nationality: item.strArea,
      category: item.strCategory,
      alcoholicOrNot: '',
      name: item.strMeal,
      image: item.strMealThumb,
      doneDate: getDate(date),
      tags: factorTags(item.strTags),
    };
    return storage.setItem('doneRecipes', JSON.stringify([objStorage]));
  } if (!JSON.parse(storage.getItem('doneRecipes'))
    .some((itemSome) => itemSome.id === item.idMeal)) {
    const objStorageIn = JSON.parse(storage.getItem('doneRecipes'));
    const arrStorage = [...objStorageIn, {
      id: item.idMeal,
      type: 'food',
      nationality: item.strArea,
      category: item.strCategory,
      alcoholicOrNot: '',
      name: item.strMeal,
      image: item.strMealThumb,
      doneDate: getDate(date),
      tags: factorTags(item.strTags),
    }];
    return storage.setItem('doneRecipes', JSON.stringify(arrStorage));
  }
}

export function setRecipesDrink(item, date) {
  const storage = localStorage;
  if (!storage.getItem('doneRecipes')) {
    const objStorage = {
      id: item.idDrink,
      type: 'drink',
      nationality: '',
      category: item.strCategory,
      alcoholicOrNot: checkIfAlcoholic(item.strAlcoholic),
      name: item.strDrink,
      image: item.strDrinkThumb,
      doneDate: getDate(date),
      tags: factorTags(item.strTags),
    };
    return storage.setItem('doneRecipes', JSON.stringify([objStorage]));
  } if (!JSON.parse(storage.getItem('doneRecipes'))
    .some((itemSome) => itemSome.id === item.idDrink)) {
    const objStorageIn = JSON.parse(storage.getItem('doneRecipes'));
    const arrStorage = [...objStorageIn, {
      id: item.idDrink,
      type: 'drink',
      nationality: '',
      category: item.strCategory,
      alcoholicOrNot: checkIfAlcoholic(item.strAlcoholic),
      name: item.strDrink,
      image: item.strDrinkThumb,
      doneDate: getDate(date),
      tags: factorTags(item.strTags),
    }];
    return storage.setItem('doneRecipes', JSON.stringify(arrStorage));
  }
}
