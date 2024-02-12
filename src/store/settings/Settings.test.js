import reducer, { setShowInput } from './settingsSlice';

test('should change showInput boolean', () => {
    // dispatch the action using the reducer
    const newState = reducer({ showInput: true }, setShowInput(false));

    // check if the state is updated correctly
    expect(newState).toEqual({ showInput: false });
});
