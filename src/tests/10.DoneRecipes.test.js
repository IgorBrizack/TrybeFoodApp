import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { createMemoryHistory } from 'history';
import { act } from 'react-dom/test-utils';
import { Router } from 'react-router-dom';
import App from '../App';
import fetch from './helpers/mocks/fetch';

describe('Testa a tela de receitas prontas', () => {
  it('Deve renderizar as receitas prontas em cards', async () => {
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
    localStorage.setItem('doneRecipes', JSON.stringify([
      {
        id: '52771',
        type: 'food',
        nationality: 'Italian',
        category: 'Vegetarian',
        alcoholicOrNot: '',
        name: 'Spicy Arrabiata Penne',
        image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
        doneDate: '23/06/2020',
        tags: ['Pasta', 'Curry'],
      },
      {
        id: '178319',
        type: 'drink',
        nationality: '',
        category: 'Cocktail',
        alcoholicOrNot:  'Alcoholic',
        name: 'Aquamarine',
        image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
        doneDate: '23/06/2020',
        tags: [],
      },
    ]));
    jest.spyOn(global, 'fetch').mockImplementation((url) => fetch(url));

    const history = createMemoryHistory();
    await act( async () => render(
      <Router history={ history }>
        <App />
      </Router>
    ));

    history.push("/done-recipes");
    const imgSpicy = await screen.findByTestId('0-horizontal-image');
    const btnDrinks = await screen.findByTestId('filter-by-drink-btn');
    userEvent.click(btnDrinks);
    expect(imgSpicy).not.toBeInTheDocument();
    const btnFoods = await screen.findByTestId('filter-by-food-btn');
    userEvent.click(btnFoods);
    const imgSpicy2 = await screen.findByTestId('0-horizontal-image');
    expect(imgSpicy2).toBeInTheDocument();
    const btnAll = await screen.findByTestId('filter-by-all-btn');
    userEvent.click(btnAll);
  });
  it('Deve renderizar a página em branco sem receitas feitas', async () => {
    localStorage.removeItem('doneRecipes');
    jest.spyOn(global, 'fetch').mockImplementation((url) => fetch(url));

    const history = createMemoryHistory();
    await act( async () => render(
      <Router history={ history }>
        <App />
      </Router>
    ));

    history.push("/done-recipes");
  });
});