import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import App from '../App';
import { act } from 'react-dom/test-utils';
import fetch from '../../cypress/mocks/fetch';

import Foods from '../pages/Foods';

describe('Faça implenetações de testes para validar o correto funcionamento da tela de Detalhes', () => {
  it('Verifique se ao clicar em um item da lista renderizada na tela, se há um redirecionamento para a tela de detalhes da receita', async () => {
    jest.spyOn(global, 'fetch').mockImplementation((url) => fetch(url) )
    // global.fetch = jest.fn((url) => fetch(url))

    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>
    );

     
    const inputEmail = screen.getByTestId('email-input');
    const inputPassword = screen.getByTestId('password-input');
    const btnEnter = screen.getByTestId('login-submit-btn');
    userEvent.type(inputEmail, 'teste@teste.com');
    userEvent.type(inputPassword, '1234567');
    userEvent.click(btnEnter);

    expect(await screen.findByRole('heading', {  name: /corba/i},{timeout: 5000})).toBeInTheDocument()
    const corbaBTN =  screen.getByRole('heading', {  name: /corba/i})
    userEvent.click(corbaBTN);

    expect(await screen.findByTestId("instructions",{timeout: 5000})).toBeInTheDocument()
    expect(global.fetch).toHaveBeenCalled()

    // await waitFor(() => expect(history.location.pathname).toBe('/foods'));

    // waitFor(() => {
    //   const corbaFood = screen.getByTestId("0-card-name")
    //   expect(corbaFood).toBeInTheDocument()
    //   userEvent.click(corbaFood)
    // })
    
    // await waitFor(() => {
    //   expect(history.location.pathname).toBe("/foods/52972")
    // })

    // waitFor(() => expect(global.fetch).toHaveBeenCalled())

    // waitFor(() => {
    //   const title = screen.getByRole('heading', {  name: /corba/i})
    //   expect(title).toBeInTheDocument()
    // })

    // waitFor(() => {
    //   const btn = screen.getByRole('button', {  name: /start recipe/i})
    //   expect(btn).toBeInTheDocument()
    //   const instructionsText = screen.getByTestId("instructions");
    //   expect(instructionsText).toBeInTheDocument()
    // })
  })
})