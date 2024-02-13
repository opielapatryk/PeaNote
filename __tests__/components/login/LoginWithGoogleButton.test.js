import React from 'react';
import renderer from 'react-test-renderer';
import LoginWithGoogleButton from '../../../src/screens/login/components/LoginWithGoogleButton';

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

jest.mock('@react-native-google-signin/google-signin', () => ({
  GoogleSignin: {
      signIn: jest.fn(),
  },
}));
  
test('LoginWithGoogle button renders correctly.', () => {
  const tree = renderer.create(<LoginWithGoogleButton />).toJSON();
  expect(tree).toMatchSnapshot();
});