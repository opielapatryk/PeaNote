import {removeNote,removePendingNote} from '../store/notes/boardSlice';
import { signOut } from "firebase/auth";
import { FIREBASE_AUTH } from '../FIrebaseConfig';
import auth from '@react-native-firebase/auth';
import { GoogleSignin} from '@react-native-google-signin/google-signin';

export const signOutAndClearReduxStore = async (notes,signOutGoogle,dispatch_redux,pendingNotes) => {
    try {
        // signOutGoogle();
        // signOut(FIREBASE_AUTH)
        // auth().signOut()
        notes.forEach(sticker => dispatch_redux(removeNote(sticker.id)));
        pendingNotes.forEach(sticker => dispatch_redux(removePendingNote(sticker.id)));
        await GoogleSignin.revokeAccess();
        await auth().signOut();
    } catch (error) {
        console.error(error);
    }
    
};