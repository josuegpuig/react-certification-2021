import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import Secret from './Secret.page';
import AuthProvider from '../../providers/Auth';

describe('App Component Tests', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <Secret />
        </AuthProvider>
      </BrowserRouter>
    );
  });

  it('Should render correct texts', () => {
    const iframe = document.body.querySelector('iframe');

    expect(iframe).toHaveAttribute(
      'src',
      'https://www.youtube.com/embed/dQw4w9WgXcQ?controls=0&autoplay=1'
    );
    expect(iframe).toHaveAttribute('title', 'rick roll');
  });

  afterEach(() => {
    cleanup();
  });
});
