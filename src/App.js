import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Provider from './context/Provider';
import Login from './pages/Login';
import DetailsFoods from './pages/DetailsFoods';
import DetailsDrinks from './pages/DetailsDrinks';
import Profile from './pages/Profile';
import FavoriteRecipes from './pages/FavoriteRecipes';
import DoneRecipes from './pages/DoneRecipes';
import Recipes from './pages/Recipes';

function App() {
  return (
    <Provider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/foods" component={ Recipes } />
          <Route exact path="/drinks" component={ Recipes } />
          <Route path="/foods/:id" component={ DetailsFoods } />
          <Route path="/drinks/:id" component={ DetailsDrinks } />
          <Route path="/foods/:id/in-progress" component={ DetailsFoods } />
          <Route path="/drinks/:id/in-progress" component={ DetailsDrinks } />
          <Route path="/profile" component={ Profile } />
          <Route path="/done-recipes" component={ DoneRecipes } />
          <Route path="/favorite-recipes" component={ FavoriteRecipes } />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
