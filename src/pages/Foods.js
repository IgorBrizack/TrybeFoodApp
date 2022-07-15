import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import context from '../context/Context';
import Header from '../components/Header';

function Foods() {
  const { history } = useHistory();
  const { setIsFoodOrDrink } = useContext(context);

  useEffect(() => {
    setIsFoodOrDrink('Foods');
  }, []);

  return (
    <div>
      <Header page="Foods" history={ history } />
      <div>Foods</div>
    </div>
  );
}

export default Foods;
