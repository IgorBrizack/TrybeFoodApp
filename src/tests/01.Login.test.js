import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import App from '../App';
import fetch from './helpers/mocks/fetch';

describe('Testa a tela de login', () => {
  it('Deve possuir dois inputs e um botão de submissão', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>
    );
    const inputEmail = screen.getByTestId('email-input');
    expect(inputEmail).toBeInTheDocument();
    const inputPassword = screen.getByTestId('password-input');
    expect(inputPassword).toBeInTheDocument();
    const btnEnter = screen.getByTestId('login-submit-btn');
    expect(btnEnter).toBeInTheDocument();
  });
  it('Deve estar desabilitado o botão quando o email ou password forem inválidos', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>
    );
    const inputEmail = screen.getByTestId('email-input');
    const inputPassword = screen.getByTestId('password-input');
    const btnEnter = screen.getByTestId('login-submit-btn');
    expect(btnEnter).toBeDisabled();
    userEvent.type(inputEmail, 'teste@teste.com');
    userEvent.type(inputPassword, '1234567');
    expect(btnEnter).not.toBeDisabled();
  });
  it('Deve redirecionar para a página correta ao clicar no botão de entrar, e verifica se muda para a tela de drinks ao clicar no botão de Drinks', async () => {
    jest.spyOn(global, 'fetch').mockImplementation((url) => fetch(url))
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
    
    const drinksBtn = screen.getByRole('img', {  name: /drinkicon/i})
    userEvent.click(drinksBtn);
  });
});