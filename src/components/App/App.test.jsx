import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App.component';

describe('App Component Tests', () => {
  beforeEach(() => {
    render(<App />);
  });

  it('Should render the Header component', async () => {
    expect(document.querySelector('header')).toBeInTheDocument();
  });

  it('Should render the Home component', async () => {
    expect(screen.getByTestId('home-component')).toBeInTheDocument();
  });

  it('Should change background color with a click', async () => {
    const { body } = document;
    const spy = jest.spyOn(body.style, 'setProperty');

    body.click();
    expect(spy).toHaveBeenCalled();
  });
});
