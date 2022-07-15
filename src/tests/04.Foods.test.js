import Foods from '../pages/Foods';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import Provider from '../context/Provider';

describe('Testa a tela de comidas', () => {
  it('Deve renderizar as 12 primeiras comidas ao entrar na rota de comidas', async () => {
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
});