import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';  
import store from '../../../../../store/store'; 
import LoginButton from '../LoginButton';

jest.mock('@react-native-firebase/auth', () => ({
    auth: {
        signInWithEmailAndPassword: jest.fn(),
        createUserWithEmailAndPassword: jest.fn(),
        signOut: jest.fn(),
    },
  }));
  
test('login button renders correctly', () => {

  const tree = renderer.create(
    <Provider store={store}>
      <LoginButton />
    </Provider>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
