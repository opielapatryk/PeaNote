import React from 'react';
import renderer from 'react-test-renderer';
import FriendRequests from '../../src/screens/auth/FriendRequestScreen/components/FriendRequests';
import { NavigationContainer } from '@react-navigation/native';
import { act } from 'react-test-renderer';
import { Provider } from 'react-redux';  
import store from '../../src/store/store'; 

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


test('Friend requests screen renders correctly.', async () => {
  const tree = renderer.create(
    <Provider store={store}>
      <NavigationContainer>
          <FriendRequests />
      </NavigationContainer>
    </Provider>
  ).toJSON();

  await act(async () => {
    expect(tree).toMatchSnapshot();
  })
},20000);
