/* eslint-disable no-console */
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

beforeEach(() => render(<App />));

test('renders Simple POS', () => {
  const linkElement = screen.getByText(/Simple POS/i);
  expect(linkElement).toBeInTheDocument();
});

test('on click renders a list of menus', () => {
  userEvent.click(screen.getByLabelText('Menu'));
  screen.getByRole('presentation');
  const a = screen.getByRole('listbox', { name: 'Menu' });
  // console.log(a, 'a');

  // screen.getByRole('listbox', { name: 'Menu' }, [
  // screen.getByText('Foo Bar Lunch')
  //   // screen.getByText('Lorem Ipsum Cocktails'),
  // ]);
});
