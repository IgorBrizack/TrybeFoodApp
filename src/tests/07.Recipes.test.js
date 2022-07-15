import { createMemoryHistory } from 'history';
import { render, screen, waitFor } from '@testing-library/react';
import { Router } from 'react-router-dom';
import Provider from '../context/Provider';
import Recipes from '../pages/Recipes';

describe('Testa a tela de Receitas', () => {
  it('Deve renderizar os componentes foods e drinks', async () => {
    const history = createMemoryHistory();
    history.location.pathname = '/drinks';
    render(
      <Router history={ history }>
        <Provider>
          <Recipes />
        </Provider>
      </Router>
    );
  });
});