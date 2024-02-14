import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';  
import store from '../../../src/store/store'; 
import CreateAccountBody from '../../../src/screens/login/components/CreateAccountBody';
import {act} from 'react-dom/test-utils'

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

test('Create account body renders correctly.', async () => {

  const tree = renderer.create(
    <Provider store={store}>
      <CreateAccountBody />
    </Provider>
  ).toJSON();

  await act(async () => {
   expect(tree).toMatchSnapshot();
  })
  
});