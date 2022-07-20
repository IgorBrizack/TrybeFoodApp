import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import App from '../App';

describe('Teste o Componente Header', () => {
  it('Verifique se ao clicar no botão de profile, se é redirecionado para a rota "/profile"' , async()=>{
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
    waitFor(() => expect(history.location.pathname).toBe('/foods'));

    const searchButton = screen.getByRole('img', {  name: /searchicon/i});
    expect(searchButton).toBeInTheDocument()
    userEvent.click(searchButton)

    const profileButton = screen.getByRole('img', {  name: /profileicon/i})
    expect(profileButton).toHaveAttribute('src', 'profileIcon.svg')
    expect(profileButton).toBeInTheDocument()
    userEvent.click(profileButton)
    waitFor(() => expect(history.location.pathname).toBe('/profile'))
    
  })
})