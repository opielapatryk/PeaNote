import {removeNote,removePendingNote} from '../store/notes/boardSlice';
import { FIREBASE_AUTH } from '../FIrebaseConfig';

export const signOutAndClearReduxStore = (notes,dispatch_redux,pendingNotes) => {
    FIREBASE_AUTH.signOut()
    notes.forEach(sticker => dispatch_redux(removeNote(sticker.id)));
    pendingNotes.forEach(sticker => dispatch_redux(removePendingNote(sticker.id)));
};