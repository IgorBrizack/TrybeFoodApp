import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import App from '../App';
import fetch from './helpers/mocks/fetch';


describe('Faça implenetações de testes para validar o correto funcionamento da tela de Detalhes', () => {
  it('Verifique se ao clicar em um item da lista renderizada na tela, se há um redirecionamento para a tela de detalhes da receita', async () => {
    jest.spyOn(global, 'fetch').mockImplementation((url) => fetch(url) )

    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>
    );

    history.push("/foods")
    console.log(history)

    expect(await screen.findByRole('heading', {  name: /corba/i},{timeout: 5000})).toBeInTheDocument()
    const corbaBTN =  screen.getByRole('heading', {  name: /corba/i})
    userEvent.click(corbaBTN);

    expect(await screen.findByTestId("instructions",{timeout: 5000})).toBeInTheDocument()
    expect(global.fetch).toHaveBeenCalled()
  })
})