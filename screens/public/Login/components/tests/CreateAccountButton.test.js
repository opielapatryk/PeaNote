import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';  
import store from '../../../../../store/store'; 
import CreateAccountButton from '../CreateAccountButton';

jest.mock('@react-native-firebase/auth', () => ({
    auth: {
        signInWithEmailAndPassword: jest.fn(),
        createUserWithEmailAndPassword: jest.fn(),
        signOut: jest.fn(),
    },
  }));
  
jest.mock('@react-native-firebase/firestore', () => ({
    firestore: {
        collection: jest.fn(),
        doc: jest.fn(),
        get: jest.fn(),
    },
}));

test('Create account button renders correctly.', () => {

  const tree = renderer.create(
    <Provider store={store}>
      <CreateAccountButton />
    </Provider>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
