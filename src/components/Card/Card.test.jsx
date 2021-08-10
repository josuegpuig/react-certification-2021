import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { BrowserRouter } from 'react-router-dom';

import Card from './Card.component';

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
        <Card
          videoId={mockInfo.videoId}
          image={mockInfo.image}
          title={mockInfo.title}
          description={mockInfo.description}
        />
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

  afterEach(() => {
    cleanup();
  });
});
