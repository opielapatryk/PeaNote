import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';  
import store from '../../../../../store/store'; 
import Login from '../Login';
import { SafeAreaProvider} from 'react-native-safe-area-context';

jest.mock('@react-native-firebase/auth', () => ({
    signInWithEmailAndPassword: jest.fn(),
    createUserWithEmailAndPassword: jest.fn(),
    signOut: jest.fn(),
}));

jest.mock('@react-native-google-signin/google-signin', () => ({
    signIn: jest.fn(),
}));


jest.mock('@invertase/react-native-apple-authentication', () => ({
  AppleButton: jest.fn(),
}));

jest.mock('@react-native-firebase/firestore', () => ({
    collection: jest.fn(),
    doc: jest.fn(),
    get: jest.fn(),
}));


test('Login screen renders correctly.', () => {
  const tree = renderer.create(
    <Provider store={store}>
      <SafeAreaProvider>

      <Login />
      </SafeAreaProvider>

    </Provider>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});