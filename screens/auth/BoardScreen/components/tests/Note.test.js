import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';  
import store from '../../../../../store/store'; 
import {Note} from '../Note';

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


test('Note renders correctly.', async () => {
  const tree = renderer.create(
    <Provider store={store}>
        <Note id={1} isInfo={false}/>
    </Provider>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});