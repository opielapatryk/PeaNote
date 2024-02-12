import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';  
import store from '../../../../../store/store'; 
import SettingsScreen from '../SettingsScreen';
import { NavigationContainer } from '@react-navigation/native';
import { act } from 'react-test-renderer';

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


test('Settings screen renders correctly.', async () => {
  const tree = renderer.create(
    <Provider store={store}>
      <NavigationContainer>
        <SettingsScreen/>
      </NavigationContainer>
    </Provider>
  ).toJSON();

  await act(async () => {
    expect(tree).toMatchSnapshot();
  })
});
