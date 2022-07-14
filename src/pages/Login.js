import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

function Login({ history }) {
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });
  const [isDisabled, setIsDisabled] = useState(true);
  function handleChange({ target }) {
    const { value, name } = target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  }
  function handleSubmit(e) {
    e.preventDefault();
    const storage = localStorage;
    const emailStorage = { email: inputs.email };
    storage.setItem('user', JSON.stringify(emailStorage));
    storage.setItem('mealsToken', 1);
    storage.setItem('cocktailsToken', 1);
    history.push('/foods');
  }
  useEffect(() => {
    function disabled() {
      const reg = /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/;
      const passwordLength = 6;
      if (inputs.email.match(reg) && inputs.password.length > passwordLength) {
        return setIsDisabled(false);
      }
      return setIsDisabled(true);
    }
    disabled();
  }, [inputs]);
  return (
    <form>
      <label htmlFor="inputEmail" onSubmit={ handleSubmit }>
        E-mail
        <input
          data-testid="email-input"
          id="inputEmail"
          type="email"
          name="email"
          value={ inputs.email }
          onChange={ handleChange }
        />
      </label>
      <label htmlFor="inputPassword">
        Password
        <input
          data-testid="password-input"
          id="inputPassword"
          type="password"
          name="password"
          value={ inputs.password }
          onChange={ handleChange }
        />
      </label>
      <button
        data-testid="login-submit-btn"
        type="submit"
        onClick={ handleSubmit }
        disabled={ isDisabled }
      >
        Entrar
      </button>
    </form>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
