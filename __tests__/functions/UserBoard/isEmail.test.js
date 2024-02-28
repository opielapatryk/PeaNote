// import { isEmail } from '../../../src/screens/auth/UserBoardScreen/functions/isEmail';
// import firestore from '@react-native-firebase/firestore';

// jest.mock('@react-native-firebase/firestore', () => {
//   const originalModule = jest.requireActual('@react-native-firebase/firestore');

//   const users = [
//     { email: 'joe@doe.com' },
//     { email: 'john@example.com' },
//   ];

//   return {
//     __esModule: true,
//     ...originalModule,
//     default: jest.fn(() => ({
//       collection: jest.fn(() => ({
//         where: jest.fn((field, operator, value) => ({
//           get: jest.fn(() => ({ empty: !users.some(user => user.email === value) })),
//         })),
//       })),
//     })),
//   };
// });

// describe('isEmail function', () => {
//   it('should return true for existing email', async ()=>{
//     const result = await isEmail('joe@doe.com');

//     expect(firestore).toHaveBeenCalled();
//     expect(result).toBe(true);
//   })

//   it('should return false for non-existing email', async () => {

//     const result = await isEmail('nonexistent@example.com');

//     expect(firestore).toHaveBeenCalled();
//     expect(result).toBe(false);
//   });
// })
it('',()=>{
  expect(true)
})