import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Profile() {
  const history = useHistory();
  const email = JSON.parse(localStorage.getItem('user'));
  console.log(email.email);
  return (
    <>
      <Header page="Profile" history={ history } />
      <div>
        Profile
        <p data-testid="profile-email">{ email.email }</p>
        <button data-testid="profile-done-btn" type="button">Done Recipes</button>
        <button data-testid="profile-favorite-btn" type="button">a</button>
        <button data-testid="profile-logout-btn" type="button">a</button>
      </div>
      <Footer />
    </>
  );
}

export default Profile;
