import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import Provider from './context/Provider';
import Login from './pages/Login';

function App() {
  return (
    <Provider>
      <Switch>
        <Route exact path="/" component={ Login } />
        {/* <Route path="/foods" component={ Login } />
        <Route path="/drinks" component={ Login } />
        <Route path="/foods/:id" component={ Login } />
        <Route path="/drinks/:id" component={ Login } />
        <Route path="/foods/:id/in-progress" component={ Login } />
        <Route path="/drinks/:id/in-progress" component={ Login } />
        <Route path="/profile" component={ Login } />
        <Route path="/done-recipes" component={ Login } />
        <Route path="/favorite-recipes" component={ Login } /> */}
      </Switch>
    </Provider>
  );
}

export default App;
