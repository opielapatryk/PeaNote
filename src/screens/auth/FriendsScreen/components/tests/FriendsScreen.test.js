import React from 'react';
import renderer from 'react-test-renderer';
import FriendsScreen from '../FriendsScreen';
import { NavigationContainer } from '@react-navigation/native';
import { act } from 'react-test-renderer';
import { Provider } from 'react-redux';  
import store from '../../../../../store/store'; 

jest.mock('@react-native-firebase/auth', () => () => {
    return {
        currentUser: {
            email:'test@example.com'
        }
    }
  })

  jest.mock('@react-native-firebase/firestore', () =>()=> {
    return {
      collection: jest.fn(()=>{
        return{
          where: jest.fn(()=>{
            return{
              get: jest.fn(() => Promise.resolve(true))
            }
          }),
        }
      }),
    };
  })

test('FriendsBoard screen renders correctly.', async () => {
    const navigation = {
      navigate: jest.fn(),
    };

    const tree = renderer.create(
      <Provider store={store}>
          <NavigationContainer>
              <FriendsScreen navigation={navigation} />
          </NavigationContainer>
        </Provider>
      ).toJSON();

      await act(async () => {
        expect(tree).toMatchSnapshot();
      })
})
