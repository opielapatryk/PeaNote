import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';  
import CreateAccountFooter from '../CreateAccountFooter';
import store from '../../../../../store/store'; 

test('create account footer renders correctly', () => {

  const tree = renderer.create(
    <Provider store={store}>
      <CreateAccountFooter />
    </Provider>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
