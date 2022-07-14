import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

function Profile({ history }) {
  return (
    <div>
      <Header page="Profile" history={ history } />
      <div>Profile</div>
    </div>
  );
}

Profile.propTypes = {
  history: PropTypes.objectOf(PropTypes.any),
}.isRequired;

export default Profile;
