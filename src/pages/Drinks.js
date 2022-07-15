import React from 'react';
import Header from '../components/Header';

function Drinks() {
  const { history } = useHistory();
  return (
    <div>
      <Header page="Drinks" history={ history } />
      Drinks
    </div>
  );
}

export default Drinks;
