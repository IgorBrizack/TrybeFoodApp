import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import context from '../context/Context';
import Header from '../components/Header';

function Drinks() {
  const history = useHistory();
  const { setIsFoodOrDrink,
    linkToDetails } = useContext(context);

  useEffect(() => {
    if (linkToDetails.length > 0) {
      history.push(linkToDetails);
    }
  }, [linkToDetails]);

  useEffect(() => {
    if (linkToDetails.length > 0 && linkToDetails !== null) history.push(linkToDetails);
  }, [linkToDetails]);

  useEffect(() => {
    setIsFoodOrDrink('Drinks');
  }, []);

  return (
    <div>
      <Header page="Drinks" history={ history } />
      Drinks
    </div>
  );
}

export default Drinks;
