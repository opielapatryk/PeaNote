import React from 'react';
import renderer from 'react-test-renderer';
import FriendRequests from '../FriendRequests';
import { NavigationContainer } from '@react-navigation/native';
import { act } from 'react-test-renderer';

jest.mock('@react-native-firebase/auth', () => () => {
    return {
        currentUser: {
            email:'test@example.com'
        }
    }
  })

jest.mock('@react-native-firebase/firestore', () => ({
    collection: jest.fn(),
    doc: jest.fn(),
    get: jest.fn(),
}));


test('Friend requests screen renders correctly.', async () => {
  const tree = renderer.create(
    <NavigationContainer>
        <FriendRequests />
    </NavigationContainer>
  ).toJSON();

  await act(async () => {
    expect(tree).toMatchSnapshot();
  })
});