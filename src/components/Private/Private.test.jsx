import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import Private from './Private.component';
import AuthProvider from '../../providers/Auth';

describe('App Component Tests', () => {
  const history = createMemoryHistory();
  beforeEach(() => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <Private />
        </AuthProvider>
      </BrowserRouter>
    );
  });

  it('Should redirect to home', async () => {
    expect(history.location.pathname).toEqual('/');
  });

  afterEach(() => {
    cleanup();
  });
});
