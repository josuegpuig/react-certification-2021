import React from 'react';
import { render, screen, cleanup, fireEvent, waitFor } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { BrowserRouter } from 'react-router-dom';
import AuthProvider from '../../providers/Auth';
import { Theme } from '../../hooks/ThemeProvider/ThemeProvider';
import { FavoritesProvider } from '../../hooks/FavoritesProvider/FavoritesProvider';

import Card from './Card.component';
import app from '../../utils/fireBaseConfig';

const mockAddFunc = jest.fn();
const mockRemoveFunc = jest.fn();

jest.mock('../../hooks/FavoritesProvider/FavoritesProvider', () => ({
  ...jest.requireActual('../../hooks/FavoritesProvider/FavoritesProvider'),
  useFavorites: jest.fn().mockImplementation(() => ({
    addFavorite: mockAddFunc,
    removeFavorite: mockRemoveFunc,
  })),
}));

jest.mock('../../utils/fireBaseConfig');
app.auth = jest.fn(() => ({
  onAuthStateChanged: jest.fn((cb) => cb({ name: 'Test' })),
  signInWithEmailAndPassword: jest.fn(() => Promise.resolve(true)),
}));

describe('Card Component Tests', () => {
  const setState = jest.fn();
  const useStateSpy = jest.spyOn(React, 'useState');
  useStateSpy.mockImplementation((init) => [init, setState]);

  const history = createMemoryHistory();
  history.push = jest.fn();
  const mockInfo = {
    videoId: 'e4Test',
    image: {
      medium: {
        url: 'imgTest.jpg',
      },
    },
    title: 'Test Card',
    description: 'Card Description',
  };

  beforeEach(() => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <Theme>
            <FavoritesProvider>
              <Card
                videoId={mockInfo.videoId}
                image={mockInfo.image}
                title={mockInfo.title}
                description={mockInfo.description}
              />
            </FavoritesProvider>
          </Theme>
        </AuthProvider>
      </BrowserRouter>
    );
  });

  it('Should render the correct props', () => {
    const link = screen.getByRole('link');
    const title = screen.getByText('Test Card');
    const description = screen.getByText('Card Description');

    expect(link).toHaveAttribute('href', '/video/e4Test');
    expect(title).toBeInTheDocument();
    expect(description).toBeInTheDocument();
  });

  it('Should show and hide buttons on hover', async () => {
    const container = screen.getByTestId('card-container');

    fireEvent.mouseEnter(container);
    const buttons = await screen.getByTestId('buttons-container');

    expect(buttons).toBeInTheDocument();

    fireEvent.mouseLeave(container);
    await waitFor(() => expect(buttons).toHaveStyle('display: none'));
  });

  it('Should add video to favorites', async () => {
    const container = screen.getByTestId('card-container');

    fireEvent.mouseEnter(container);
    await screen.getByTestId('buttons-container');
    const addButton = screen.getByRole('button');

    fireEvent.click(addButton);

    expect(mockAddFunc).toHaveBeenCalled();
  });

  afterEach(() => {
    cleanup();
  });
});
