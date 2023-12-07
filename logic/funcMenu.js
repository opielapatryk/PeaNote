import {removeNote} from '../store/notes/boardSlice';

export const signOutAndClearReduxStore = (notes,signOut,dispatch_redux) => {
    signOut();
    notes.forEach(sticker => dispatch_redux(removeNote(sticker.id)));
};