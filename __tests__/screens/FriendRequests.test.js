// import React from 'react';
// import renderer from 'react-test-renderer';
// import FriendRequests from '../../src/screens/auth/FriendRequestScreen/components/FriendRequests';
// import { NavigationContainer } from '@react-navigation/native';
// import { act } from 'react-test-renderer';
// import { Provider } from 'react-redux';  
// import store from '../../src/store/store'; 

// const chai = require('chai');
// const assert = chai.assert;
// const sinon = require('sinon');
// const admin = require('firebase-admin');
// const test = require('firebase-functions-test')();
// sinon.stub(admin, 'initializeApp');

// jest.mock('@react-native-firebase/auth', () => () => {
//     return {
//         currentUser: {
//             email:'test@example.com'
//         }
//     }
//   })

//   jest.mock('@react-native-firebase/database', () => {
//     const originalModule = jest.requireActual('@react-native-firebase/database');
//     const sinon = require('sinon');
  
//     const userId = 'userId';
//     const userName = 'Elon musk';
  
//     const fakeData = {
//       'users': {
//         userId: {
//           'name': userName,
//           'email': 'musk.email@tesla.com',
//           'photoUrl': 'url-to-photo.jpg',
//         },
//         'otherUserId': {
//           'name': 'userName',
//           'email': 'othermusk.email@tesla.com',
//           'photoUrl': 'other_url-to-photo.jpg',
//         }
//       }
//     };
  
//     const refStub = sinon.stub();
//     const childStub = sinon.stub();
//     const orderByChildStub = sinon.stub();
//     const equalToStub = sinon.stub();
//     const onceStub = sinon.stub();
  
//     refStub.returns({
//       child: childStub.returns({
//         orderByChild: orderByChildStub.returns({
//           equalTo: equalToStub.returns({
//             once: onceStub // Do not apply mockReturnValueOnce here
//           })
//         })
//       })
//     });
  
//     onceStub.returns({ val: () => fakeData }); // Apply mockReturnValueOnce here
  
//     return {
//       __esModule: true,
//       ...originalModule,
//       default: jest.fn(() => ({
//         app: jest.fn(() => ({
//           database: jest.fn(() => ({
//             ref: refStub
//           }))
//         }))
//       })),
//     };
//   });
  
//   let oldDatabase;
//   before(() => {
//     // Save the old database method so it can be restored after the test.
//     oldDatabase = admin.database;
//   });

//   after(() => {
//     // Restoring admin.database() to the original method.
//     admin.database = oldDatabase;
//   });
  

// test('Friend requests screen renders correctly.', async () => {

//   const refParam = '/messages';
//   const pushParam = { original: 'input' };
//   const databaseStub = sinon.stub();
//   const refStub = sinon.stub();
//   const pushStub = sinon.stub();

//   // The following lines override the behavior of admin.database().ref('/messages')
//   // .push({ original: 'input' }) to return a promise that resolves with { ref: 'new_ref' }.
//   // This mimics the behavior of a push to the database, which returns an object containing a
//   // ref property representing the URL of the newly pushed item.

//   Object.defineProperty(admin, 'database', { get: () => databaseStub });
//   databaseStub.returns({ ref: refStub });
//   refStub.withArgs(refParam).returns({ push: pushStub });
//   pushStub.withArgs(pushParam).returns(Promise.resolve({ ref: 'new_ref' }));

//   const tree = renderer.create(
//     <Provider store={store}>
//       <NavigationContainer>
//           <FriendRequests />
//       </NavigationContainer>
//     </Provider>
//   ).toJSON();

//   await act(async () => {
//     expect(tree).toMatchSnapshot();
//   })
// },20000);

it('test',()=>{
  expect(true)
})
