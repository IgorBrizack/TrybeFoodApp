import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';

function Profile() {
  const history = useHistory();

  return (
    <div>
      <Header page="Profile" history={ history } />
      <div>Profile</div>
    </div>
  );
}

export default Profile;
