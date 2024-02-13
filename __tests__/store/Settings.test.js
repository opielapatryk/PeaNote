import reducer, { removeMyImage, setFriendimage, setMyimage, setShowInput,setShowInputUsername, setUsername, } from '../../src/store/settings/settingsSlice';

test('should change showInput', () => {
    const newState = reducer({ showInput: true }, setShowInput(false));

    expect(newState).toEqual({ showInput: false });
});

test('should change showInputUsername', () => {
    const newState = reducer({ showInputUsername: true }, setShowInputUsername(false));

    expect(newState).toEqual({ showInputUsername: false });
});

test('should set username', () => {
    const newState = reducer({ username: '' }, setUsername("Joe"));

    expect(newState).toEqual({ username: 'Joe' });
});

test('should set my image', () => {
    const newState = reducer({ myimage: '' }, setMyimage("uri"));

    expect(newState).toEqual({ myimage: 'uri' });
});

test('should set friend image', () => {
    const newState = reducer({ friendimage: '' }, setFriendimage("uri"));

    expect(newState).toEqual({ friendimage: 'uri' });
});

test('should remove my image', () => {
    const newState = reducer({ myimage: 'uri' }, removeMyImage());

    expect(newState).toEqual({ myimage: '' });
});