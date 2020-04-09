import React from 'react';
import { render } from '@testing-library/react';
import FindRoom from '../components/home/FindRoom';

it('renders findroom component as expected', () => {
  const { container } = render(<FindRoom />);
  expect(container).toMatchSnapshot();
});
