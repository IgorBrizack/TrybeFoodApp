import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Profile() {
  const history = useHistory();

  return (
    <div>
      <Header page="Profile" history={ history } />
      <div>Profile</div>
      <Footer />
    </div>
  );
}

export default Profile;
