import reducer, { setCreateAccount,setEmail,setPassword,setMessage } from './loginSlice';

test('should change createAccount bool', () => {
    // dispatch the action using the reducer
    const newState = reducer({ createAccount: true }, setCreateAccount(false));

    // check if the state is updated correctly
    expect(newState).toEqual({ createAccount: false });
});

test('should change email', () => {
    // dispatch the action using the reducer
    const newState = reducer({ email: '' }, setEmail('joe@example.com'));

    // check if the state is updated correctly
    expect(newState).toEqual({ email: 'joe@example.com' });
});

test('should change password', () => {
    // dispatch the action using the reducer
    const newState = reducer({ password: '' }, setPassword('foo'));

    // check if the state is updated correctly
    expect(newState).toEqual({ password: 'foo' });
});

test('should change message', () => {
    // dispatch the action using the reducer
    const newState = reducer({ message: '' }, setMessage('bar'));

    // check if the state is updated correctly
    expect(newState).toEqual({ message: 'bar' });
});
