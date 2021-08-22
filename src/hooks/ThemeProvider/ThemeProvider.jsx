/* istanbul ignore file */
import React, { createContext, useContext, useReducer } from 'react';
import { ThemeProvider } from 'styled-components';

const ThemeContext = createContext(null);
const initialState = { darkMode: false };

const themeReducer = (state, action) => {
  switch (action.type) {
    case 'LIGHTMODE':
      return { darkMode: false };
    case 'DARKMODE':
      return { darkMode: true };
    default:
      return state;
  }
};

function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error(`Can't use "useTheme" without an SearchProvider!`);
  }
  return context;
}

function Theme({ children }) {
  const [state, dispatch] = useReducer(themeReducer, initialState);

  return (
    <ThemeContext.Provider value={{ theme: state, setTheme: dispatch }}>
      <ThemeProvider theme={state}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
}

export { useTheme, Theme };
