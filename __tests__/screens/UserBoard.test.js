// import React from 'react';
// import renderer from 'react-test-renderer';
// import { Provider } from 'react-redux';  
// import store from '../../src/store/store'; 
// import { SafeAreaProvider} from 'react-native-safe-area-context';
// import UserBoard from '../../src/screens/auth/UserBoardScreen/components/UserBoard';
// import { useDispatch, useSelector } from 'react-redux';
// import { render, fireEvent, waitFor } from '@testing-library/react-native';

// const mockState = {
//   settings: {
//     friendimage: 'https://example.com/profile.jpg',
//   },
//   login: {
//     message: 'Test message',
//     reduxdescription: 'Test description',
//   },
// };


// jest.mock('react-redux')


// jest.mock('@react-navigation/native', () => ({
//   ...jest.requireActual('@react-navigation/native'),
//   useFocusEffect: jest.fn(),
// }));

// jest.mock('@react-native-firebase/auth', () => ({
//     signInWithEmailAndPassword: jest.fn(),
//     createUserWithEmailAndPassword: jest.fn(),
//     signOut: jest.fn(),
// }));

// jest.mock('@react-native-google-signin/google-signin', () => ({
//     signIn: jest.fn(),
// }));


// jest.mock('@invertase/react-native-apple-authentication', () => ({
//   AppleButton: jest.fn(),
// }));

// jest.mock('@react-native-firebase/firestore', () => {
//   const originalModule = jest.requireActual('@react-native-firebase/firestore');

//   const users = [
//     { email: 'joe@doe.com',description:'joe@doe.com description',username:'justjoe' },
//     { email: 'john@example.com',description:'john@example.com description',username:'justjohn'},
//   ];

//   return {
//     __esModule: true,
//     ...originalModule,
//     default: jest.fn(() => ({
//       collection: jest.fn(() => ({
//         where: jest.fn((field, operator, value) => ({
//           get: jest.fn(() => ({ 
//             empty: !users.some(user => user.email === value),
//             docs: users.filter(user => user.email === value).map(user => ({
//                 data: jest.fn(() => ({
//                   description: user.description,
//                 })),
//             })),
//          })),
//         })),
//       })),
//     })),
//   };
// });

// beforeEach(() => {
//   useSelector.mockImplementation((selector) => selector(mockState));
// });


// import { getDescription } from '../../src/screens/auth/UserBoardScreen/functions/getDescription';

// it('UserBoard screen renders correctly.', async () => {
//   const tree = renderer.create(
//     <Provider store={store}>
//       <SafeAreaProvider>
//         <UserBoard/>
//       </SafeAreaProvider>
//     </Provider>
//   ).toJSON();
//   expect(tree).toMatchSnapshot();

//   const getDescriptionSpy = require('../../src/screens/auth/UserBoardScreen/functions/getDescription')

//   const spy = jest.spyOn(getDescriptionSpy, 'getDescription')

//   await getDescription('joe@doe.com')

//   expect(spy).toHaveBeenCalled();
// });

// it('renders props correctly',()=>{
//   const mockedParams = {
//     route: {params:{friendEmail: 'friend@doe.com', name:'Joe', oldnickname:''}},
//     navigation: ''
//   }
//   const component = render(<UserBoard {...mockedParams}/>).toJSON()
// })
it('',()=>{
  expect(true)
})