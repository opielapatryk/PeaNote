import reducer, { addNote, removeNote,changeInfo,addPendingNote,removePendingNote,changePendingInfo } from './boardSlice';

test('should add new note to state', () => {
    const newState = reducer({ notes: [{ id: 1, text: 'foo', isInfo: false }]}, addNote({ id: 2, text: 'bar', isInfo: false }));

    expect(newState).toEqual({ notes: [{ id: 1, text: 'foo', isInfo: false },{ id: 2, text: 'bar', isInfo: false }]});
});

test('should add new pending note to state', () => {
    const newState = reducer({ pendingNotes: [{ id: 1, text: 'foo', isInfo: false }]}, addPendingNote({ id: 2, text: 'bar', isInfo: false }));

    expect(newState).toEqual({ pendingNotes: [{ id: 1, text: 'foo', isInfo: false },{ id: 2, text: 'bar', isInfo: false }]});
});

test('should remove note', () => {
    const newState = reducer({ notes: [{ id: 1, text: 'foo', isInfo: false }]}, removeNote(1));

    expect(newState).toEqual({ notes: []});
});

test('should remove pending note', () => {
    const newState = reducer({ pendingNotes: [{ id: 1, text: 'foo', isInfo: false }]}, removePendingNote(1));

    expect(newState).toEqual({ pendingNotes: []});
});

test('Should change isInfo in note.', () => {
    const newState = reducer({ notes: [{ id: 1, text: 'foo', isInfo: false }]}, changeInfo(1));

    expect(newState).toEqual({ notes: [{ id: 1, text: 'foo', isInfo: true }]});
});

test('Should change isInfo in pending note.', () => {
    const newState = reducer({ pendingNotes: [{ id: 1, text: 'foo', isInfo: false }]}, changePendingInfo(1));

    expect(newState).toEqual({ pendingNotes: [{ id: 1, text: 'foo', isInfo: true }]});
});