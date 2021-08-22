import React from 'react';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import AuthProvider from '../../providers/Auth';
import { SearchProvider } from '../../hooks/SearchProvider/SearchProvider';
import { Theme } from '../../hooks/ThemeProvider/ThemeProvider';
import Header from './Header.component';

import { SearchVideos } from '../../resources/calls';

jest.mock('../../resources/calls');

SearchVideos.mockImplementation(() => {
  jest.fn();
});

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
          <Theme>
            <SearchProvider>
              <Header />
            </SearchProvider>
          </Theme>
        </AuthProvider>
      </Router>
    );
  });

  it('Should display the home link', async () => {
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByTestId('SearchMenu')).toBeInTheDocument();
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

  it('Should redirect to home on first option to open menu', async () => {
    const button = screen.getByTestId('button-menu');

    button.click();
    const closest = button.nextElementSibling;
    const firstOption = closest.querySelector('a');

    firstOption.click();
    expect(history.push).toHaveBeenCalled();
  });

  it('Should search videos on click', async () => {
    const searchInput = screen.getByTestId('SearchMenu');

    fireEvent.change(searchInput, { target: { value: 'foo' } });

    expect(searchInput.value).toBe('foo');

    const button = screen.getByTestId('button-search');

    button.click();
    expect(SearchVideos).toHaveBeenCalled();
  });

  it('Should change theme on toggle', async () => {
    const checkTheme = screen.getByTestId('check-theme');

    fireEvent.change(checkTheme, { target: { value: true } });

    expect(checkTheme.value).toBe('true');
  });

  afterEach(() => {
    cleanup();
  });
});
