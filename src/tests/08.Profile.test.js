import { createMemoryHistory } from 'history';
import { render, screen, waitFor } from '@testing-library/react';
import { Router } from 'react-router-dom';
import Provider from '../context/Provider';
import Profile from '../pages/Profile';
import userEvent from '@testing-library/user-event';

describe('Testa a tela de Perfil', () => {
 const history = createMemoryHistory();
 
beforeEach(() => {
 window.localStorage.setItem('user', '{ "email": "email@mail.com" }');
}) 
 
 it('renderiza os botoes: logout, favorite recipes, done recipes', async () => {
  render(
   <Router history={ history }>
     <Provider>
       <Profile />
     </Provider>
   </Router>
 );
  const btDone = screen.getByTestId('profile-done-btn');
  const btLogout = screen.getByTestId('profile-logout-btn');
  const btFavorites = screen.getByTestId('profile-favorite-btn');

  expect(btDone).toBeInTheDocument();
  expect(btLogout).toBeInTheDocument();
  expect(btFavorites).toBeInTheDocument();
 });

 it('testa o funcionamento do botao logout', async () => {
  render(
   <Router history={ history }>
     <Provider>
       <Profile />
     </Provider>
   </Router>
 ); 
  const btLogout = screen.getByTestId('profile-logout-btn');
  userEvent.click(btLogout);
  expect(history.location.pathname).toBe('/');
 });

 it('testa o funcionamento do botao favorites', async () => {
  render(
   <Router history={ history }>
     <Provider>
       <Profile />
     </Provider>
   </Router>
 ); 
  const btFavorites = screen.getByTestId('profile-favorite-btn');
  userEvent.click(btFavorites);
  expect(history.location.pathname).toBe('/favorite-recipes');
 });

 it('testa o funcionamento do botao Done', async () => {
  render(
   <Router history={ history }>
     <Provider>
       <Profile />
     </Provider>
   </Router>
 ); 
  const btDone = screen.getByTestId('profile-done-btn');
  userEvent.click(btDone);
  expect(history.location.pathname).toBe('/done-recipes');
 });
});