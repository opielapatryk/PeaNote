import React from 'react';
import renderer from 'react-test-renderer';
import Logout from '../Logout';
import { NavigationContainer } from '@react-navigation/native';
import { act } from 'react-test-renderer';
import { Provider } from 'react-redux';  
import store from '../../../../../store/store'; 

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

test('Logout component renders correctly.', async () => {
    const navigation = {
      navigate: jest.fn(),
      addListener: jest.fn(),
    };

    const tree = renderer.create(
        <Provider store={store}>
            <NavigationContainer>
                <Logout navigation={navigation} />
            </NavigationContainer>
        </Provider>
      ).toJSON();

      await act(async () => {
        expect(tree).toMatchSnapshot();
      })
})
