import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';  
import store from '../../../src/store/store'; 
import {PendingNote} from '../../../src/screens/auth/PendingScreen/components/PendingNote';

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


test('Pending note renders correctly.', async () => {
  const tree = renderer.create(
    <Provider store={store}>
        <PendingNote id={1} isInfo={false}/>
    </Provider>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
