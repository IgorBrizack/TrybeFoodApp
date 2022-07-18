import Drinks from '../pages/Drinks';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import Provider from '../context/Provider';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import fetch from './helpers/mocks/fetch';

describe('Testa a tela de bebidas', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  })
  it('Deve renderizar as 12 primeiras bebidas ao entrar na rota de bebidas', async () => {
    jest.spyOn(global, 'fetch').mockImplementation((url) => fetch(url) )
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <Provider>
          <Drinks />
        </Provider>
      </Router>
    );
    for (let i = 0; i < 12; i ++) {
      const drinkCard = await screen.findByTestId(`${i}-recipe-card`);
      expect(drinkCard).toBeInTheDocument();
    }
  });

  it('Deve renderizar os componentes por categoria ao clicar na categoria específica', async () => {
    jest.spyOn(global, 'fetch').mockImplementation((url) => fetch(url) )
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <Provider>
          <Drinks />
        </Provider>
      </Router>
    );
    const btnCategory = await screen.findByTestId('Cocktail-category-filter');
    const btnAll = await screen.findByTestId('All-category-filter');
    userEvent.click(btnCategory);
    const belmont = await screen.findByText('155 Belmont');
    userEvent.click(btnCategory);
    expect(belmont).not.toBeInTheDocument();
    userEvent.click(btnCategory);
    const belmont2 = await screen.findByText('155 Belmont');
    userEvent.click(btnAll);
    expect(belmont2).not.toBeInTheDocument();
  });
});