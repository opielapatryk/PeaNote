import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';  
import store from '../../src/store/store'; 
import PendingScreen from '../../src/screens/auth/PendingScreen/components/PendingScreen';
import { NavigationContainer } from '@react-navigation/native';
import { act } from 'react-test-renderer';
import { SafeAreaProvider} from 'react-native-safe-area-context';

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

jest.mock('@react-native-firebase/auth', () => ()=> {
  return {
    currentUser: {
      email:'test@example.com'
    }
  };
})

test('Pending screen renders correctly.', async () =>  {
  const tree = renderer.create(
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>
            <PendingScreen />
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  ).toJSON();

  await act(async () => {
    expect(tree).toMatchSnapshot();
  })
});