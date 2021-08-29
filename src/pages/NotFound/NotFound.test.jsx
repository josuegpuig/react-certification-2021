import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import NotFound from './NotFound.page';
import AuthProvider from '../../providers/Auth';
import app from '../../utils/fireBaseConfig';

jest.mock('../../utils/fireBaseConfig');
app.auth = jest.fn(() => ({
  onAuthStateChanged: jest.fn((cb) => cb({ name: 'Test' })),
}));

describe('App Component Tests', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <NotFound />
        </AuthProvider>
      </BrowserRouter>
    );
  });

  it('Should render correct texts', () => {
    const notFound = screen.getByRole('img');

    expect(notFound).toHaveAttribute('src', '404.gif');
    expect(notFound).toHaveAttribute('alt', 'page not found');
  });

  afterEach(() => {
    cleanup();
  });
});
