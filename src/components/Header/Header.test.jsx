import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import AuthProvider from '../../providers/Auth';
import Header from './Header.component';

describe('Header Component Tests', () => {
  const setState = jest.fn();
  const useStateSpy = jest.spyOn(React, 'useState');
  useStateSpy.mockImplementation((init) => [init, setState]);

  const history = createMemoryHistory();
  history.push = jest.fn();

  beforeEach(() => {
    render(
      <Router history={history}>
        <AuthProvider>
          <Header />
        </AuthProvider>
      </Router>
    );
  });

  it('Should display the home link', async () => {
    expect(screen.getByText('Home')).toBeInTheDocument();
  });

  it('Should redirect to log in when requested', async () => {
    const button = screen.getByText('Log In');

    button.click();
    expect(button.href).toBe('http://localhost/login');

    expect(history.push).toHaveBeenCalled();
    expect(history.push.mock.calls[0][0]).toEqual('/login');
  });

  afterEach(() => {
    cleanup();
  });
});
