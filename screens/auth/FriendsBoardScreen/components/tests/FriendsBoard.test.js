import React from 'react';
import renderer from 'react-test-renderer';
import FriendsBoard from '../FriendsBoard';

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

test('FriendsBoard screen renders correctly.', async () => {
    const route = {
      params: {
        friendEmail: 'test@example.com',
      },
    };
    const navigation = {
      navigate: jest.fn(),
    };

    const tree = renderer.create(
        <FriendsBoard route={route} navigation={navigation} />
      ).toJSON();
    expect(tree).toMatchSnapshot();
})
