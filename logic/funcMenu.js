import {removeNote,removePendingNote} from '../store/notes/boardSlice';
import auth from '@react-native-firebase/auth';
import { GoogleSignin} from '@react-native-google-signin/google-signin';

export const signOutAndClearReduxStore = async (notes,dispatch_redux,pendingNotes) => {
    try {
        notes.forEach(sticker => dispatch_redux(removeNote(sticker.id)));
        pendingNotes.forEach(sticker => dispatch_redux(removePendingNote(sticker.id)));
        await auth().signOut();
        await GoogleSignin.revokeAccess();
    } catch (error) {
        console.error(error);
    }
    
};