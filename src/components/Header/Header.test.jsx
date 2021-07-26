import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';

import App from '../App/App.component';

describe('App Component Tests', () => {
  const setState = jest.fn();
  const useStateSpy = jest.spyOn(React, 'useState');
  useStateSpy.mockImplementation((init) => [init, setState]);

  beforeEach(() => {
    render(<App />);
  });

  it('Should display the home link', async () => {
    expect(screen.getByText('Home')).toBeInTheDocument();
  });

  it('Should redirect to log in when requested', async () => {
    const button = screen.getByText('Log In');

    button.click();
    expect(button.href).toBe('http://localhost/login');

    const title = screen.getByText('Welcome back!');
    expect(title).toBeInTheDocument();
  });

  afterEach(() => {
    cleanup();
  });
});
