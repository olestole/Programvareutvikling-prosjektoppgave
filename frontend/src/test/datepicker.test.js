import React from 'react';
import { render } from '@testing-library/react';
import Datepicker from '../components/home/Datepicker';

it('renders datepicker component as expected', () => {
  const { container } = render(<Datepicker />);
  expect(container).toMatchSnapshot();
});
