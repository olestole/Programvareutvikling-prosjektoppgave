import React from 'react';
import renderer from 'react-test-renderer';
import Datepicker from '../components/home/Datepicker';

it('renders datepicker component as expected', () => {
  const tree = renderer.create(<Datepicker />).toJSON();
  expect(tree).toMatchSnapshot();
});
