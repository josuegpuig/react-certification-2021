import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import { Router, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import { useGetVideo } from '../../hooks/VideoDetails/VideoDetails';
import { Theme } from '../../hooks/ThemeProvider/ThemeProvider';
import VideoPage from './Video.page';
import video from '../../utils/video-mock.json';
import suggestions from '../../utils/video-suggestions-mock.json';

jest.mock('../../hooks/VideoDetails/VideoDetails');

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
      <Theme>
        <Router history={history}>
          <Route path="/video/:id">
            <VideoPage />
          </Route>
        </Router>
      </Theme>
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

  afterEach(() => {
    cleanup();
  });
});
