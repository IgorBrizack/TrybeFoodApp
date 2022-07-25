import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import Provider from '../context/Provider';
import Foods from '../pages/Foods';
import fetch from './helpers/mocks/fetch';
import App from '../App';


describe('Teste o componente "SearchBar" e sua funcionalidades',() => {
  it('Verifique se existe o input para fazer a busca os 3 filtros "Name", "Ingredient" e "FirstLetter" e execute o botão de buscar', async()=> {
    const history = createMemoryHistory();
    
    render(
      <Router history={ history }>
        <Provider>
          <Foods />
        </Provider>
      </Router>
    );    
  
    const searchButton = await screen.findByRole('img', {  name: /searchicon/i}, {timeout: 2000});
    await waitFor(() => {
      expect(searchButton).toBeInTheDocument()
      userEvent.click(searchButton)

    })
    const searchInput = screen.getByTestId('search-input')
    expect(searchInput).toBeInTheDocument()

    const ingredientRadio = screen.getByRole('radio', {  name: /ingredient/i});
    expect(ingredientRadio).toBeInTheDocument();

    const nameRadio = screen.getByRole('radio', {  name: /name/i});
    expect(nameRadio).toBeInTheDocument();

    const buscarBtn = screen.getByRole('button', {  name: /buscar/i});
    expect(buscarBtn).toBeInTheDocument()
  })

  it('Faça chamadas a API na tela de drinks uma vez para cada Filtro ao final forçe o alerta ao passar mais de uma letra na filtragem da "first Letter" ', async() => {
    const history = createMemoryHistory();
    
    render(
      <Router history={ history }>
        <Provider>
          <Foods />
        </Provider>
      </Router>
    );    
  
    const searchButton = await screen.findByRole('img', {  name: /searchicon/i}, {timeout: 2000});
    await waitFor(() => {
      expect(searchButton).toBeInTheDocument()
      userEvent.click(searchButton)

    })
    const searchInput = screen.getByTestId('search-input')
    expect(searchInput).toBeInTheDocument()

    const ingredientRadio = screen.getByRole('radio', {  name: /ingredient/i});
    expect(ingredientRadio).toBeInTheDocument();
    
    const nameRadio = screen.getByRole('radio', {  name: /name/i});
    expect(nameRadio).toBeInTheDocument();

    const firstLetterRadio = screen.getByRole('radio', {  name: /first letter/i});
    expect(firstLetterRadio).toBeInTheDocument()

    const buscarBtn = screen.getByRole('button', {  name: /buscar/i});
    expect(buscarBtn).toBeInTheDocument()

    userEvent.type(searchInput, "potato");
    userEvent.click(ingredientRadio);
    userEvent.click(buscarBtn);

    userEvent.type(searchInput, "soup");
    userEvent.click(nameRadio);
    userEvent.click(buscarBtn);

    userEvent.type(searchInput, "a");
    userEvent.click(firstLetterRadio);
    userEvent.click(buscarBtn);

    userEvent.type(searchInput, "aa");
    userEvent.click(firstLetterRadio);
    userEvent.click(buscarBtn);
  })

  it('Teste se ao buscar um prato válido e único, se é redirecionado de imediato para a tela de detalhes', async () => {
    const history = createMemoryHistory(); 

    render(
      <Router history={ history }>
        <App />
      </Router>
    )

    history.push('/foods')

    const searchIcon = await screen.findByRole('img', {  name: /searchicon/i});
    expect(searchIcon).toBeInTheDocument();
    userEvent.click(searchIcon); 

    const nameRadioButton = await screen.findByTestId('name-search-radio');
    expect(nameRadioButton).toBeInTheDocument();
    userEvent.click(nameRadioButton);

    const inputSearch = await screen.findByTestId("search-input");
    expect(inputSearch).toBeInTheDocument()
    userEvent.type(inputSearch, 'kumpir');
    
    const searchButton = await screen.findByRole('button', {  name: /buscar/i})
    expect(searchButton).toBeInTheDocument();
    userEvent.click(searchButton);

    await waitFor(() => {
      expect(history.location.pathname).toBe('/foods/52978');
    })
  })

  it('Teste se ao buscar um drink válido e único, se é redirecionado de imediato para a tela de detalhes', async () => {
    const history = createMemoryHistory(); 

    render(
      <Router history={ history }>
        <App />
      </Router>
    )

    history.push('/drinks')

    const searchIcon = await screen.findByRole('img', {  name: /searchicon/i});
    expect(searchIcon).toBeInTheDocument();
    userEvent.click(searchIcon); 

    const nameRadioButton = await screen.findByTestId('name-search-radio');
    expect(nameRadioButton).toBeInTheDocument();
    userEvent.click(nameRadioButton);

    const inputSearch = await screen.findByTestId("search-input");
    expect(inputSearch).toBeInTheDocument()
    userEvent.type(inputSearch, 'Figgy Thyme');
    
    const searchButton = await screen.findByRole('button', {  name: /buscar/i})
    expect(searchButton).toBeInTheDocument();
    userEvent.click(searchButton);

    await waitFor(() => {
      expect(history.location.pathname).toBe('/drinks/178344');
    })
  })

})