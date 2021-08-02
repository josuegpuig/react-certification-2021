import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import AuthProvider from '../../providers/Auth';
import { SearchProvider } from '../../hooks/SearchProvider/SearchProvider';
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
          <SearchProvider>
            <Header />
          </SearchProvider>
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

  it('Should open the menu with home as first child', async () => {
    const button = screen.getByTestId('button-menu');

    button.click();
    const closest = button.nextElementSibling;
    const firstOption = closest.querySelector('a');

    expect(firstOption.innerHTML).toBe('Home');
  });

  afterEach(() => {
    cleanup();
  });
});
