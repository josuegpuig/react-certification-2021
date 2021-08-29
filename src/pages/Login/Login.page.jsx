import React from 'react';
import ReactDom from 'react-dom';
import { useHistory, useLocation } from 'react-router';

import { useAuth } from '../../providers/Auth';
import './Login.styles.css';

function LoginPage() {
  const { login } = useAuth();
  const history = useHistory();
  const location = useLocation();

  function authenticate(event) {
    event.preventDefault();
    const inputs = event.target.elements;
    const values = { user: inputs.username.value, password: inputs.password.value };
    login(values);
    // history.push('/secret');
  }

  function onClose() {
    history.push(location.state.prev);
  }

  return ReactDom.createPortal(
    <section>
      <div className="modal-overlay">
        <div className="modal-container">
          <h1>Welcome back!</h1>
          <form onSubmit={authenticate} className="login-form">
            <div className="form-group">
              <label htmlFor="username">
                <strong>username </strong>
                <input required type="text" name="username" />
              </label>
            </div>
            <div className="form-group">
              <label htmlFor="password">
                <strong>password </strong>
                <input required type="password" name="password" />
              </label>
            </div>
            <div className="button-group">
              <button type="submit">login</button>
              <button type="button" onClick={onClose}>
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>,
    document.getElementById('modal-root')
  );
}

export default LoginPage;
