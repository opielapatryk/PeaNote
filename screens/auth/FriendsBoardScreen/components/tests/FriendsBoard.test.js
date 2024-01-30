import React from 'react';
import renderer from 'react-test-renderer';
import FriendsBoard from '../FriendsBoard';
import { Provider } from 'react-redux';  
import store from '../../../../../store/store'; 

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
      <Provider store={store}>
        <FriendsBoard route={route} navigation={navigation} />
      </Provider>
      ).toJSON();
    expect(tree).toMatchSnapshot();
})
