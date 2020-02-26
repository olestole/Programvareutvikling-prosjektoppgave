import React from 'react';
import renderer from 'react-test-renderer';
import FindRoom from '../components/FindRoom';
import FindRoom from '../components/FindRoom';

it('renders avatar as expected', () => {
  const tree = renderer.create(<FindRoom />).toJSON();
  expect(tree).toMatchSnapshot();
});
