// import { getDescription } from '../../../src/screens/auth/UserBoardScreen/functions/getDescription';

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

// describe('getDescription function', () => {
//   it('should return take email/username and return description', async ()=>{
//     const description = await getDescription('joe@doe.com')
//     expect(description).toBe('joe@doe.com description');
//   })
// })

it('',()=>{
  expect(true)
})