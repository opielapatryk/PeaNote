import reducer, { addNote, removeNote,changeInfo,addPendingNote,removePendingNote,changePendingInfo } from './boardSlice';

test('should add new note to state and contain history', () => {
    const newState = reducer({ notes: [{ id: 1, text: 'foo', isInfo: false }],history:[{ id: 1, text: 'foo', isInfo: false }] }, addNote({ id: 2, text: 'bar', isInfo: false }));

    expect(newState).toEqual({ notes: [{ id: 1, text: 'foo', isInfo: false },{ id: 2, text: 'bar', isInfo: false }],history:[{ id: 1, text: 'foo', isInfo: false }] });
});

test('should add new pending note to state and contain history', () => {
    const newState = reducer({ pendingNotes: [{ id: 1, text: 'foo', isInfo: false }],pendingHistory:[{ id: 1, text: 'foo', isInfo: false }] }, addPendingNote({ id: 2, text: 'bar', isInfo: false }));

    expect(newState).toEqual({ pendingNotes: [{ id: 1, text: 'foo', isInfo: false },{ id: 2, text: 'bar', isInfo: false }],pendingHistory:[{ id: 1, text: 'foo', isInfo: false }] });
});

test('should remove note and contain history', () => {
    const newState = reducer({ notes: [{ id: 1, text: 'foo', isInfo: false }],history:[{ id: 1, text: 'foo', isInfo: false }] }, removeNote(1));

    expect(newState).toEqual({ notes: [],history:[{ id: 1, text: 'foo', isInfo: false }] });
});

test('should remove pending note and contain history', () => {
    const newState = reducer({ pendingNotes: [{ id: 1, text: 'foo', isInfo: false }],pendingHistory:[{ id: 1, text: 'foo', isInfo: false }] }, removePendingNote(1));

    expect(newState).toEqual({ pendingNotes: [],pendingHistory:[{ id: 1, text: 'foo', isInfo: false }] });
});

test('should change text if info is set true of clicked note and contain history', () => {
    const newState = reducer({ notes: [{ id: 1, text: 'foo', isInfo: false }],history:[{ id: 1, text: 'foo', isInfo: false }] }, changeInfo(1));

    expect(newState).toEqual({ notes: [{ id: 1, text: 'click again to delete note', isInfo: true }],history:[{ id: 1, text: 'foo', isInfo: false }] });
});

test('should change text if info is set true of clicked pending note and contain pending history', () => {
    const newState = reducer({ pendingNotes: [{ id: 1, text: 'foo', isInfo: false }],pendingHistory:[{ id: 1, text: 'foo', isInfo: false }] }, changePendingInfo(1));

    expect(newState).toEqual({ pendingNotes: [{ id: 1, text: 'click again to delete note', isInfo: true }],pendingHistory:[{ id: 1, text: 'foo', isInfo: false }] });
});