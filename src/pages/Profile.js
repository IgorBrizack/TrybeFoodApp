import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Profile() {
  const [storage, getStorage] = useState();
  const history = useHistory();

  useEffect(() => {
    getStorage(JSON.parse(localStorage.getItem('user')));
  }, []);
  return (
    <>
      <Header page="Profile" history={ history } />
      {storage && (
        <div>
          Profile
          <p data-testid="profile-email">{ storage.email }</p>
          <button
            data-testid="profile-done-btn"
            type="button"
            onClick={ () => history.push('/done-recipes') }
          >
            Done Recipes
          </button>
          <button
            data-testid="profile-favorite-btn"
            type="button"
            onClick={ () => history.push('/favorite-recipes') }
          >
            Favorite Recipes
          </button>
          <button
            data-testid="profile-logout-btn"
            type="button"
            onClick={ () => {
              localStorage.clear();
              history.push('/');
            } }
          >
            Logout
          </button>
        </div>
      )}
      <Footer />
    </>
  );
}

export default Profile;
