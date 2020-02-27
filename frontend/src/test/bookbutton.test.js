import React from 'react';
import { render } from '@testing-library/react';
import BookButton from '../components/BookButton';

test('renders Finn ditt rom!', () => {
  const { getByText } = render(<BookButton />);
  const linkElement = getByText(/Finn ditt rom!/);
  expect(linkElement).toBeInTheDocument();
});
