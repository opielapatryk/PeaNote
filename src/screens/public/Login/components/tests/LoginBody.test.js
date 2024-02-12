import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';  
import store from '../../../../../store/store'; 
import LoginBody from '../LoginBody';

jest.mock('@react-native-firebase/auth', () => ({
    auth: {
        signInWithEmailAndPassword: jest.fn(),
        createUserWithEmailAndPassword: jest.fn(),
        signOut: jest.fn(),
    },
  }));
  
jest.mock('@react-native-google-signin/google-signin', () => ({
    GoogleSignin: {
        signIn: jest.fn(),
    },
  }));

jest.mock('@react-native-firebase/firestore', () => ({
    firestore: {
        collection: jest.fn(),
        doc: jest.fn(),
        get: jest.fn(),
    },
}));

test('Login body renders correctly.', () => {

  const tree = renderer.create(
    <Provider store={store}>
      <LoginBody />
    </Provider>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
