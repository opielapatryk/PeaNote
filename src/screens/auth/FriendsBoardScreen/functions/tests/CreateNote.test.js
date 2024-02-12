import { createNote } from '../createNote';

jest.mock('@react-native-firebase/auth', () => () => {
    return {
        currentUser: {
            email:'test@example.com'
        }
    }
  })

jest.mock('@react-native-firebase/firestore', () => ({
  default: jest.fn(),
}));

describe('createNote function', () => {
  it('should set message when content is empty', async () => {
    const setContent = jest.fn();
    const setMessage = jest.fn();
    const friendEmail = 'friend@example.com';

    // Call the function with empty content
    await createNote('', setContent, setMessage, friendEmail);

    // Assertions
    expect(setContent).not.toHaveBeenCalled();
    expect(setMessage).toHaveBeenCalledWith('Note cannot be empty..');
  });
});
