import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';  
import store from '../../src/store/store'; 
import { SafeAreaProvider} from 'react-native-safe-area-context';
import UserBoard from '../../src/screens/auth/UserBoardScreen/components/UserBoard';

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


it('Login screen renders correctly.', () => {
  const tree = renderer.create(
    <Provider store={store}>
      <SafeAreaProvider>
        <UserBoard />
      </SafeAreaProvider>
    </Provider>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});