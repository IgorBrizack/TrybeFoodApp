import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import fetch from './helpers/mocks/fetch';
import App from '../App';
import { act } from 'react-dom/test-utils';

describe("Testa a tela de favoritos", () => {
 beforeEach(async () => {
  jest.spyOn(global, 'fetch').mockImplementation((url) => fetch(url));
  const history = createMemoryHistory();
  await act( async () => render(
   <Router history={ history }>
     <App />
   </Router>
 ));
 
 const localStorageMock = (() => {
  let store = {};
  return {
  getItem(key) {
  return store[key];
  },
  setItem(key, value) {
  store[key] = value.toString();
  },
  clear() {
  store = {};
  },
  removeItem(key) {
  delete store[key];
  }
  };
  })();
  Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});
localStorage.setItem('favoriteRecipes', JSON.stringify([
  {
    id: '52771',
    type: 'food',
    nationality: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
  },
  {
    id: '178319',
    type: 'drink',
    nationality: '',
    category: 'Cocktail',
    alcoholicOrNot:  'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
  },
]));

 history.push("/favorite-recipes");
 })
 it("testa se ao clicar no botao all mantem todos favoritos", async () => {
  
 const foodTextEl = await screen.findByText(/spicy arrabiata penne/i);
 const drinkTextEl = await screen.findByText(/aquamarine/i);

 expect(foodTextEl).toBeInTheDocument();
 expect(drinkTextEl).toBeInTheDocument();


 const buttonAll = screen.getByRole('button', {  name: /all/i});
 expect(buttonAll).toBeInTheDocument();

 userEvent.click(buttonAll);

 expect(foodTextEl).toBeInTheDocument();
 expect(drinkTextEl).toBeInTheDocument(); 

 })
 it("testa se ao clicar no botao food, tras somente foods", async () => {
  const foodTextEl = await screen.findByText(/spicy arrabiata penne/i);
  const drinkTextEl = await screen.findByText(/aquamarine/i);

  const buttonFood = screen.getByRole('button', {  name: /food/i});
  expect(buttonFood).toBeInTheDocument();
  userEvent.click(buttonFood);
  expect(drinkTextEl).not.toBeInTheDocument();
  expect(foodTextEl).toBeInTheDocument();
 })
 it("testa se ao clicar no botao drink, tras somente drinks", async () => {  
  const foodTextEl = await screen.findByText(/spicy arrabiata penne/i);
  expect(foodTextEl).toBeInTheDocument();
  const buttonDrink = screen.getByRole('button', {  name: /drink/i});
  expect(buttonDrink).toBeInTheDocument();
  userEvent.click(buttonDrink);
  await waitFor(() => expect(screen.queryByText(/spicy arrabiata penne/i)).not.toBeInTheDocument());
  const drinkTextEl = await screen.findByText(/aquamarine/i);
  expect(drinkTextEl).toBeInTheDocument();
 })
 it("testa se ao clicar no icone blackHeart remove o elemento dos favoritos", async () => {
  const foodTextEl = await screen.findByText(/spicy arrabiata penne/i);
  expect(foodTextEl).toBeInTheDocument();
  
  const view = screen.getByTestId('0-horizontal-favorite-btn');
  const bt = within(view).getByRole('img', {
    name: /favoriteicon/i
  });
   userEvent.click(bt);
   await waitFor(() => expect(screen.queryByText(/spicy arrabiata penne/i)).not.toBeInTheDocument());

 })
 it('Deve renderizar a página em branco sem receitas feitas', async () => {
  localStorage.removeItem('favoriteRecipes');
  jest.spyOn(global, 'fetch').mockImplementation((url) => fetch(url));

  const history = createMemoryHistory();
  await act( async () => render(
    <Router history={ history }>
      <App />
    </Router>
  ));

  history.push("/favorite-recipes");
});
})