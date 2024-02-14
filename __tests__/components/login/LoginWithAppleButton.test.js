import React from 'react';
import renderer from 'react-test-renderer';
import LoginWithAppleButton from '../../../src/screens/login/components/LoginWithAppleButton';

test('LoginWithApple button renders correctly.', () => {
  const tree = renderer.create(<LoginWithAppleButton />).toJSON();
  expect(tree).toMatchSnapshot();
});