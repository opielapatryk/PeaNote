import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';  
import LoginFooter from '../../../src/screens/public/Login/components/LoginFooter';
import store from '../../../src/store/store'; 

test('Login footer renders correctly.', () => {

  const tree = renderer.create(
    <Provider store={store}>
      <LoginFooter />
    </Provider>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
