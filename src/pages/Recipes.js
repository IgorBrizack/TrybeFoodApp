import React from 'react';
import { useHistory } from 'react-router-dom';
import Drinks from './Drinks';
import Foods from './Foods';

function Recipes() {
  const history = useHistory();
  if (history.location.pathname === '/foods') {
    return (
      <Foods />
    );
  } if (history.location.pathname === '/drinks') {
    return (
      <Drinks />
    );
  }
  return null;
}

export default Recipes;
