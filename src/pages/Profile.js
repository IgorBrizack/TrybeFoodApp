import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Profile() {
  // alterando para uso do estado
  const [storage, getStorage] = useState();
  const history = useHistory();

  useEffect(() => {
    getStorage(JSON.parse(localStorage.getItem('user')));
  }, []);
  return (
    <>
      <Header page="Profile" history={ history } />
      {storage && (
        <div className="btnsProfile">
          <p data-testid="profile-email" className="emailProfile">{ storage.email }</p>
          <div className="btnsCategoryProfile">
            <button
              data-testid="profile-done-btn"
              type="button"
              onClick={ () => history.push('/done-recipes') }
              className="btn btn-danger"
            >
              Done Recipes
            </button>
            <button
              data-testid="profile-favorite-btn"
              type="button"
              onClick={ () => history.push('/favorite-recipes') }
              className="btn btn-danger"
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
              className="btn btn-danger"
            >
              Logout
            </button>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}

export default Profile;
