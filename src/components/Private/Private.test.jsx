import React from 'react';
import { render, cleanup, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { storage } from '../../utils/storage';

import Private from './Private.component';
import AuthProvider from '../../providers/Auth';

describe('App Component Tests', () => {
  const history = createMemoryHistory();
  beforeEach(() => {
    storage.get = jest.fn(() => {
      return true;
    });
    render(
      <BrowserRouter>
        <AuthProvider>
          <Private>
            <div>Hello</div>
          </Private>
        </AuthProvider>
      </BrowserRouter>
    );
  });

  it('Should redirect to home', async () => {
    expect(history.location.pathname).toEqual('/');
  });

  it('Should render child when authenticated', async () => {
    const div = screen.getByText('Hello');

    expect(div).toBeInTheDocument();
  });

  afterEach(() => {
    cleanup();
  });
});
