import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import App from '../App';
import fetch from './helpers/mocks/fetch';


describe('Faça implenetações de testes para validar o correto funcionamento da tela de Detalhes', () => {
  it('Verifique se ao clicar em um item da lista renderizada na tela, se há um redirecionamento para a tela de detalhes da receita', async () => {
    jest.spyOn(global, 'fetch').mockImplementation((url) => fetch(url) )
    localStorage.removeItem('favoriteRecipes');
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
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      cocktails: {},
      meals: {
        52977: [false, false, false, false, false, false, false, false, false, false, false, false, false],
      },
    }));

    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>
    );

    history.push("/foods/52977")

    // expect(await screen.findByRole('heading', {  name: /corba/i},{timeout: 5000})).toBeInTheDocument()
    // const corbaBTN =  screen.getByRole('heading', {  name: /corba/i})
    // userEvent.click(corbaBTN);

    expect(await screen.findByTestId("instructions",{timeout: 5000})).toBeInTheDocument()
    expect(global.fetch).toHaveBeenCalled()

    const favoriteBtn = screen.getByRole('img', {  name: /favoriteicon/i});
    expect(favoriteBtn).toBeInTheDocument()
    userEvent.click(favoriteBtn);
    userEvent.click(favoriteBtn)

    const shareButton = screen.getByRole('img', {  name: /shareicon/i});
    expect(shareButton).toBeInTheDocument();
    
    // NÃO ENCONTRO O CONTINUE RECIPE
    expect(await screen.findByRole('button', {  name: /continue recipe/i}, {timeout: 5000})).toBeInTheDocument()

    history.push("/drinks")

    expect(await screen.findByRole('heading', {  name: /gg/i},{timeout: 5000})).toBeInTheDocument()
    const ggBTN =  screen.getByRole('heading', {  name: /gg/i})
    userEvent.click(ggBTN);

    expect(await screen.findByTestId("instructions",{timeout: 5000})).toBeInTheDocument()
    expect(global.fetch).toHaveBeenCalled()

    const favoriteBtnDrinks = screen.getByRole('img', {  name: /favoriteicon/i});
    expect(favoriteBtnDrinks).toBeInTheDocument()
    userEvent.click(favoriteBtnDrinks);
    userEvent.click(favoriteBtnDrinks)

    const shareButtonDrinks = screen.getByRole('img', {  name: /shareicon/i});
    expect(shareButtonDrinks).toBeInTheDocument();
    
  })
})