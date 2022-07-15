import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import context from '../context/Context';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Drinks() {
  const { history } = useHistory();
  const { setIsFoodOrDrink } = useContext(context);

  useEffect(() => {
    setIsFoodOrDrink('Drinks');
  }, []);

  return (
    <div>
      <Header page="Drinks" history={ history } />
      Drinks
      <Footer />
    </div>
  );
}

export default Drinks;
