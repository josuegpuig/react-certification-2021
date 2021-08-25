import React from 'react';
import { render, screen, cleanup, fireEvent, waitFor } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import Login from './Login.page';
import AuthProvider from '../../providers/Auth';
import app from '../../utils/fireBaseConfig';

jest.mock('../../utils/fireBaseConfig');
app.auth = jest.fn(() => ({
  onAuthStateChanged: jest.fn((cb) => cb({ name: 'Test' })),
  signInWithEmailAndPassword: jest.fn(() => Promise.resolve(true)),
}));

const mockUseLocationValue = {
  pathname: '/testroute',
  search: '',
  hash: '',
  state: {
    prev: '/',
  },
};
jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useLocation: jest.fn().mockImplementation(() => {
    return mockUseLocationValue;
  }),
}));

describe('App Component Tests', () => {
  const history = createMemoryHistory();
  history.push = jest.fn();
  const portalRoot = document.createElement('div');
  portalRoot.setAttribute('id', 'modal-root');
  document.body.appendChild(portalRoot);

  beforeEach(() => {
    render(
      <Router history={history}>
        <AuthProvider>
          <Login />
        </AuthProvider>
      </Router>
    );
  });

  it('Should go to home', async () => {
    const button = screen.getByText('login');

    fireEvent.click(button);
    await waitFor(() => expect(history.push).toHaveBeenCalled());
    expect(history.push.mock.calls[0][0]).toEqual('/');
  });

  it('Should go to previous on close', async () => {
    const button = screen.getByText('Close');

    fireEvent.click(button);
    await waitFor(() => expect(history.push).toHaveBeenCalled());
    expect(history.push.mock.calls[0][0]).toEqual('/');
  });

  afterEach(() => {
    cleanup();
  });
});
