import React from 'react';
import renderer from 'react-test-renderer';
import Avatar from '../components/shared/Avatar';

it('renders avatar as expected', () => {
  const tree = renderer.create(<Avatar />).toJSON();
  expect(tree).toMatchSnapshot();
});
