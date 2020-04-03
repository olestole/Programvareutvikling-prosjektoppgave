import React from 'react';
import renderer from 'react-test-renderer';
import FindRoom from '../components/home/FindRoom';

it('renders findroom component as expected', () => {
  const tree = renderer.create(<FindRoom />).toJSON();
  expect(tree).toMatchSnapshot();
});
