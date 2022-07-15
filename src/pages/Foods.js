import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';

function Foods() {
  const { history } = useHistory();
  return (
    <div>
      <Header page="Foods" history={ history } />
      <div>Foods</div>
    </div>
  );
}

export default Foods;
