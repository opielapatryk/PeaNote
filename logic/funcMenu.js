import {removeNote,removePendingNote} from '../store/notes/boardSlice';
import auth from '@react-native-firebase/auth';
import { GoogleSignin} from '@react-native-google-signin/google-signin';

export const signOutAndClearReduxStore = async (notes,dispatch,pendingNotes) => {
    try {
        notes.forEach(sticker => dispatch(removeNote(sticker.id)));
        pendingNotes.forEach(sticker => dispatch(removePendingNote(sticker.id)));
        await auth().signOut();
        await GoogleSignin.revokeAccess();
    } catch (error) {
        console.error(error);
    }
};