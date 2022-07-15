import Drinks from '../pages/Drinks';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import Provider from '../context/Provider';

describe('Testa a tela de bebidas', () => {
  it('Deve renderizar as 12 primeiras bebidas ao entrar na rota de bebidas', async () => {
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
});