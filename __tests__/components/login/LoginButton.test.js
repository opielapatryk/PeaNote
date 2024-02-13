import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';  
import store from '../../../src/store/store'; 
import LoginButton from '../../../src/screens/login/components/LoginButton';

jest.mock('@react-native-firebase/auth', () => ({
    auth: {
        signInWithEmailAndPassword: jest.fn(),
        createUserWithEmailAndPassword: jest.fn(),
        signOut: jest.fn(),
    },
  }));
  
test('Login button renders correctly.', () => {

  const tree = renderer.create(
    <Provider store={store}>
      <LoginButton />
    </Provider>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
