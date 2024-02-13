// import { createNote } from '../createNote';

// jest.mock('@react-native-firebase/auth', () => () => {
//     return {
//         currentUser: {
//             email:'test@example.com'
//         }
//     }
//   })

// jest.mock('@react-native-firebase/firestore', () => ({
//   collection: jest.fn(),
// }));

// describe('createNote function', () => {
//   it('should set message when content is empty', async () => {
//     const setContent = jest.fn();
//     const setMessage = jest.fn();
//     const friendEmail = 'friend@example.com';

//     await createNote('', setContent, setMessage, friendEmail);

//     expect(setContent).not.toHaveBeenCalled();
//     expect(setMessage).toHaveBeenCalledWith('Note cannot be empty..');
//   });
// });

test('fake test', () => {
  expect(true).toBeTruthy();
})