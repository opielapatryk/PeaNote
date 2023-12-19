import {removeNote,removePendingNote} from '../store/notes/boardSlice';

export const signOutAndClearReduxStore = (notes,signOut,dispatch_redux,pendingNotes) => {
    signOut();
    notes.forEach(sticker => dispatch_redux(removeNote(sticker.id)));
    pendingNotes.forEach(sticker => dispatch_redux(removePendingNote(sticker.id)));
};