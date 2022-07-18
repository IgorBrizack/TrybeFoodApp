import Foods from '../pages/Foods';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router-dom';
import Provider from '../context/Provider';
import fetch from './helpers/mocks/fetch';

describe('Testa a tela de comidas', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  })

  it('Deve renderizar as 12 primeiras comidas ao entrar na rota de comidas', async () => {
    jest.spyOn(global, 'fetch').mockImplementation((url) => fetch(url) )
    const history = createMemoryHistory();
     render(
      <Router history={ history }>
        <Provider>
          <Foods />
        </Provider>
      </Router>
    );
    for (let i = 0; i < 12; i ++) {
      const foodCard = await screen.findByTestId(`${i}-recipe-card`);
      expect(foodCard).toBeInTheDocument();
    }
  });
  it('Deve renderizar os componentes por categoria ao clicar na categoria específica', async () => {
    jest.spyOn(global, 'fetch').mockImplementation((url) => fetch(url) )
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <Provider>
          <Foods />
        </Provider>
      </Router>
    );

    const btnCategory = await screen.findByTestId('Beef-category-filter');
    const btnAll = await screen.findByTestId('All-category-filter');
    userEvent.click(btnCategory);
    const pie = await screen.findByText('Beef and Mustard Pie');
    userEvent.click(btnCategory);
    expect(pie).not.toBeInTheDocument();
    userEvent.click(btnCategory);
    const pie2 = await screen.findByText('Beef and Mustard Pie');
    userEvent.click(btnAll);
    expect(pie2).not.toBeInTheDocument();
  });
});