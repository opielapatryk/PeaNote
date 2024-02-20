import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';  
import store from '../../../src/store/store'; 
import {Note} from '../../../src/screens/auth/BoardScreen/components/Note';

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


test('Note renders correctly.', async () => {
  const tree = renderer.create(
    <Provider store={store}>
        <Note id={1} isInfo={false}/>
    </Provider>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
