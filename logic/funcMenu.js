import {removeNote,removePendingNote} from '../store/notes/boardSlice';
import { signOut } from "firebase/auth";
import { FIREBASE_AUTH } from '../FIrebaseConfig';

export const signOutAndClearReduxStore = (notes,signOutGoogle,dispatch_redux,pendingNotes) => {
    signOutGoogle();
    signOut(FIREBASE_AUTH)
    notes.forEach(sticker => dispatch_redux(removeNote(sticker.id)));
    pendingNotes.forEach(sticker => dispatch_redux(removePendingNote(sticker.id)));
};