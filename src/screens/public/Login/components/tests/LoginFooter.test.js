import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';  
import LoginFooter from '../LoginFooter';
import store from '../../../../../store/store'; 

test('Login footer renders correctly.', () => {

  const tree = renderer.create(
    <Provider store={store}>
      <LoginFooter />
    </Provider>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
