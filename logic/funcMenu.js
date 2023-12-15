import {removeNote,removePendingNote} from '../store/notes/boardSlice';
import { FIREBASE_AUTH } from '../FIrebaseConfig';
import { GoogleSignin} from '@react-native-google-signin/google-signin';

export const signOutAndClearReduxStore = (notes,dispatch_redux,pendingNotes) => {
    if(singinwithgoogle){
        GoogleSignin.revokeAccess()
        GoogleSignin.signOut()
    }else{
        FIREBASE_AUTH.signOut()
    }

    notes.forEach(sticker => dispatch_redux(removeNote(sticker.id)));
    pendingNotes.forEach(sticker => dispatch_redux(removePendingNote(sticker.id)));
};