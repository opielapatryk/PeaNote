import {removeNote,removePendingNote} from '../store/notes/boardSlice';
import auth from '@react-native-firebase/auth';
import { GoogleSignin} from '@react-native-google-signin/google-signin';

export const signOutAndClearReduxStore = async (notes, dispatch, pendingNotes) => {
    try {
        notes.forEach(sticker => dispatch(removeNote(sticker.id)));
        pendingNotes.forEach(sticker => dispatch(removePendingNote(sticker.id)));

        await auth().signOut();
        console.log("Successfully signed out");

        await GoogleSignin.revokeAccess();
        console.log("Successfully revoked access");
    } catch (error) {
        console.error("Error during sign-out:", error);
        console.error("Google Sign-In Error Details:", error.toJSON());
    }
};
