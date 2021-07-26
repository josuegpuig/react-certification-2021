import React from 'react';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import Login from './Login.page';
import AuthProvider from '../../providers/Auth';

describe('App Component Tests', () => {
  const history = createMemoryHistory();
  history.push = jest.fn();

  beforeEach(() => {
    render(
      <Router history={history}>
        <AuthProvider>
          <Login />
        </AuthProvider>
      </Router>
    );
  });

  it('Should go to home', () => {
    const button = screen.getByText('login');

    fireEvent.click(button);
    expect(history.push).toHaveBeenCalled();
    expect(history.push.mock.calls[0][0]).toEqual('/secret');
  });

  afterEach(() => {
    cleanup();
  });
});
