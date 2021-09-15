import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

test('renders Simple POS', () => {
  render(<App />);
  const linkElement = screen.getByText(/Simple POS/i);
  expect(linkElement).toBeInTheDocument();
});

test('click displays a list of menus', () => {
  render(<App />);
  userEvent.click(screen.getByText('Foo Bar Lunch'));
});
