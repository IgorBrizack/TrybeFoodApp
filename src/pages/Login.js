import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/main.css';

function Login() {
  const history = useHistory();
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
    <form className="formDiv">
      <h1 className="logoApp">Food-Trybe</h1>
      <label htmlFor="inputEmail" onSubmit={ handleSubmit }>
        <input
          data-testid="email-input"
          id="inputEmail"
          type="email"
          name="email"
          value={ inputs.email }
          placeholder="E-mail"
          onChange={ handleChange }
        />
      </label>
      <label htmlFor="inputPassword">
        <input
          data-testid="password-input"
          id="inputPassword"
          type="password"
          name="password"
          value={ inputs.password }
          placeholder="Senha"
          onChange={ handleChange }
        />
      </label>
      <button
        data-testid="login-submit-btn"
        type="submit"
        onClick={ handleSubmit }
        disabled={ isDisabled }
        className="btn btn-danger"
      >
        Entrar
      </button>
    </form>
  );
}

export default Login;
