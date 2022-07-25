import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { createMemoryHistory } from 'history';
import { act } from 'react-dom/test-utils';
import { Router } from 'react-router-dom';
import App from '../App';
import fetch from './helpers/mocks/fetch';

describe('Implemente testes que verifiquem a integridade do funcionamento do botão de favoritar' ,() => {
  it('verifique se um item favoritado aparece na tela', async () => {
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
        id: "178344",
        type: "drink",
        nationality: "",
        category: "Cocktail",
        alcoholicOrNot: "Alcoholic",
        name: "Figgy Thyme",
        image: "https://www.thecocktaildb.com/images/media/drink/pbw4e51606766578.jpg",
      }
    ]));
    // jest.spyOn(global, 'fetch').mockImplementation((url) => fetch(url));

    const history = createMemoryHistory();

    render(
      <Router history={ history }>
        <App />
      </Router>
    );

    history.push('/drinks/178344')

    const buttonFavorite = await screen.findByRole('img', {  name: /favoriteicon/i})

    expect(buttonFavorite).toHaveAttribute('src', 'blackHeartIcon.svg');


    


    





  })
})