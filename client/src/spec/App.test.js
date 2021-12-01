/* eslint-disable no-console */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import App from '../App';
import SelectedOption from '../components/SelectedOption';

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache: new InMemoryCache(),
});

beforeEach(() => render(
<ApolloProvider client={client}>
  <App />
</ApolloProvider>));

test('App renders Simple POS', () => {
  const logoText = screen.getByRole('heading', { name: /Simple POS/i });
  expect(logoText).toBeInTheDocument();
});

test('The select dropdown onClick displays a list of roles', () => {
  render(<SelectedOption />);
  
  const button = screen.getByRole('button', { name: 'Select ' });
  expect(button).toBeInTheDocument();

  fireEvent.click(button);
  // TODO: Finish test
});
