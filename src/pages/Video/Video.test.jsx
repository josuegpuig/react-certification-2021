import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import { Router, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import { useGetVideo } from '../../hooks/VideoDetails/VideoDetails';
import { Theme } from '../../hooks/ThemeProvider/ThemeProvider';
import { FavoritesProvider } from '../../hooks/FavoritesProvider/FavoritesProvider';
import AuthProvider from '../../providers/Auth';
import VideoPage from './Video.page';
import video from '../../utils/video-mock.json';
import suggestions from '../../utils/video-suggestions-mock.json';
import app from '../../utils/fireBaseConfig';

jest.mock('../../utils/fireBaseConfig');
jest.mock('../../hooks/VideoDetails/VideoDetails');

app.auth = jest.fn(() => ({
  onAuthStateChanged: jest.fn((cb) => cb({ name: 'Test' })),
  signInWithEmailAndPassword: jest.fn(() => Promise.resolve(true)),
}));

useGetVideo.mockImplementation(() => ({
  video,
  suggestions,
}));

describe('Card Component Tests', () => {
  const home = '/video/e4Test';
  const history = createMemoryHistory();
  history.push(home);

  beforeEach(() => {
    render(
      <AuthProvider>
        <Theme>
          <FavoritesProvider>
            <Router history={history}>
              <Route path="/video/:id">
                <VideoPage />
              </Route>
            </Router>
          </FavoritesProvider>
        </Theme>
      </AuthProvider>
    );
  });

  it('Should render the video player', () => {
    expect(screen.getByTitle(video.items[0].snippet.title)).toBeInTheDocument();
  });

  it('Should render the correct props', async () => {
    const iframe = await document.body.querySelector('iframe');

    expect(iframe).toHaveAttribute(
      'src',
      'https://www.youtube.com/embed/e4Test?controls=1'
    );
  });

  it('Should show add to favorites on authentication', async () => {
    const button = screen.getByText(/Agregar a Favoritos/);

    expect(button).toBeInTheDocument();
  });

  it('Should change components on add to favorites', async () => {
    const button = screen.getByText(/Agregar a Favoritos/);

    button.click();
    const list = await screen.getByTestId('favorites-list');
    const buttonRemove = screen.getByText(/Remover de Favoritos/);

    expect(list).toBeInTheDocument();
    expect(buttonRemove).toBeInTheDocument();
  });

  afterEach(() => {
    cleanup();
  });
});
