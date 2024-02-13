import reducer, { setCreateAccount,setEmail,setPassword,setMessage, setDescription } from '../../src/store/login/loginSlice';

test('should change createAccount bool', () => {
    const newState = reducer({ createAccount: true }, setCreateAccount(false));

    expect(newState).toEqual({ createAccount: false });
});

test('should change email', () => {
    const newState = reducer({ email: '' }, setEmail('joe@example.com'));

    expect(newState).toEqual({ email: 'joe@example.com' });
});

test('should change password', () => {
    const newState = reducer({ password: '' }, setPassword('foo'));

    expect(newState).toEqual({ password: 'foo' });
});

test('should change message', () => {
    const newState = reducer({ message: '' }, setMessage('bar'));

    expect(newState).toEqual({ message: 'bar' });
});


test('should change description', () => {
    const newState = reducer({ reduxdescription: '' }, setDescription('bar'));

    expect(newState).toEqual({ reduxdescription: 'bar' });
});
