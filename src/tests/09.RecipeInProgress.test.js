import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { createMemoryHistory } from 'history';
import { act } from 'react-dom/test-utils';
import { Router } from 'react-router-dom';
import App from '../App';
import fetch from './helpers/mocks/fetch';

describe('Faça implenetações de testes para validar o correto funcionamento da tela de receita em progresso', () => {
  it('Testa a tela de progresso de receita de comida', async () => {
    jest.spyOn(global, 'fetch').mockImplementation((url) => fetch(url) )

    const history = createMemoryHistory();
    await act( async () => render(
      <Router history={ history }>
        <App />
      </Router>
    ));

    history.push("/foods/52771")

    expect(await screen.findByRole('heading', {  name: /Spicy Arrabiata Penne/i},{timeout: 5000})).toBeInTheDocument()

    const btnStart = await screen.findByTestId('start-recipe-btn');
    userEvent.click(btnStart);
    expect(history.location.pathname).toBe('/foods/52771/in-progress');

    const checkbox = await screen.findByTestId('0-ingredient-step');
    userEvent.click(checkbox);
    const checkbox1 = await screen.findByTestId('1-ingredient-step');
    userEvent.click(checkbox1);
    const checkbox2 = await screen.findByTestId('2-ingredient-step');
    userEvent.click(checkbox2);
    const checkbox3 = await screen.findByTestId('3-ingredient-step');
    userEvent.click(checkbox3);
    const checkbox4 = await screen.findByTestId('4-ingredient-step');
    userEvent.click(checkbox4);
    const checkbox5 = await screen.findByTestId('5-ingredient-step');
    userEvent.click(checkbox5);
    const checkbox6 = await screen.findByTestId('6-ingredient-step');
    userEvent.click(checkbox6);
    const checkbox7 = await screen.findByTestId('7-ingredient-step');
    userEvent.click(checkbox7);

    const finished = await screen.findByTestId('finish-recipe-btn');
    userEvent.click(finished);
    expect(history.location.pathname).toBe('/done-recipes');
  });
  it('Testa a tela de progresso de receita de bebida', async () => {
    jest.spyOn(global, 'fetch').mockImplementation((url) => fetch(url) )

    const history = createMemoryHistory();
    await act( async () => render(
      <Router history={ history }>
        <App />
      </Router>
    ));
    history.push("/drinks/15997");

    expect(await screen.findByRole('heading', {  name: /GG/i},{timeout: 5000})).toBeInTheDocument()

    const btnStart = await screen.findByTestId('start-recipe-btn');
    userEvent.click(btnStart);
    expect(history.location.pathname).toBe('/drinks/15997/in-progress');

    const checkbox = await screen.findByTestId('0-ingredient-step');
    userEvent.click(checkbox);
    const checkbox1 = await screen.findByTestId('1-ingredient-step');
    userEvent.click(checkbox1);
    const checkbox2 = await screen.findByTestId('2-ingredient-step');
    userEvent.click(checkbox2);

    const finished = await screen.findByTestId('finish-recipe-btn');
    userEvent.click(finished);
    expect(history.location.pathname).toBe('/done-recipes');
  });
})