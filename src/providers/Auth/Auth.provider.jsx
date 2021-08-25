import React, { useState, useEffect, useContext, useCallback } from 'react';
import { useHistory } from 'react-router';
import app from '../../utils/fireBaseConfig';

const AuthContext = React.createContext(null);

function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(`Can't use "useAuth" without an AuthProvider!`);
  }
  return context;
}

function AuthProvider({ children }) {
  const [authUser, setAuthUser] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [error, setError] = useState('');
  const history = useHistory();

  useEffect(() => {
    app.auth().onAuthStateChanged((user) => {
      if (user) {
        setAuthUser(user);
        setAuthenticated(true);
      }
    });
  }, []);

  const login = useCallback(
    async (info) => {
      const { user, password } = info;

      await app
        .auth()
        .signInWithEmailAndPassword(user, password)
        .then((result) => {
          console.log(result);
          console.log('llamando a history');
          history.push('/');
        })
        .catch((err) => {
          setError(err.message);
        });
    },
    [history]
  );

  const logout = useCallback(() => {
    app
      .auth()
      .signOut()
      .then(() => {
        setAuthUser(null);
        setAuthenticated(false);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  return (
    <AuthContext.Provider value={{ authUser, login, logout, authenticated, error }}>
      {children}
    </AuthContext.Provider>
  );
}

export { useAuth };
export default AuthProvider;
