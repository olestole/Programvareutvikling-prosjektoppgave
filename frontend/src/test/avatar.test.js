import React from 'react';
import { render } from '@testing-library/react';
import Avatar from '../components/shared/Avatar';

it('renders avatar as expected', () => {
  const { container } = render(<Avatar />);
  expect(container).toMatchSnapshot();
});
