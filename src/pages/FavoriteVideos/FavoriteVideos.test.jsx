import React from 'react';
import { Router } from 'react-router';
import { cleanup, render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { FavoritesProvider } from '../../hooks/FavoritesProvider/FavoritesProvider';

import AuthProvider from '../../providers/Auth';
import FavoriteVideos from './FavoriteVideos.page';
import { Theme } from '../../hooks/ThemeProvider/ThemeProvider';

jest.mock('../../hooks/FavoritesProvider/FavoritesProvider', () => ({
  ...jest.requireActual('../../hooks/FavoritesProvider/FavoritesProvider'),
  useFavorites: jest.fn().mockImplementation(() => ({
    favorites: [
      {
        etag: 'HYyRZiwBWc8',
        title: 'Test',
        videoId: 'HYyRZiwBWc8',
        image: { medium: { url: 'test.com' } },
      },
    ],
    favoritesList: { HYyRZiwBWc8: true },
  })),
}));

describe('FavoriteVideos Page Tests', () => {
  const history = createMemoryHistory();

  beforeEach(() => {
    render(
      <Router history={history}>
        <AuthProvider>
          <Theme>
            <FavoritesProvider>
              <FavoriteVideos />
            </FavoritesProvider>
          </Theme>
        </AuthProvider>
      </Router>
    );
  });

  it('Should render the title', () => {
    expect(screen.getByText(/Favorites/)).toBeInTheDocument();
  });

  afterEach(() => {
    cleanup();
  });
});
