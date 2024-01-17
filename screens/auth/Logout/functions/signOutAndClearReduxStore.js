import {removeNote,removePendingNote} from '../../../../store/notes/boardSlice';
import auth from '@react-native-firebase/auth';
import { GoogleSignin} from '@react-native-google-signin/google-signin';
import { setShowInput } from '../../../../store/settings/settingsSlice';
import { setFirstName,setLastName,setEmail,setPassword,setCreateAccount,setMessage } from '../../../../store/login/loginReducer';

export const signOutAndClearReduxStore = async (notes, dispatch, pendingNotes) => {
    try {
        await dispatch(setShowInput(false))
        await dispatch(setCreateAccount(false))
        await dispatch(setFirstName(''))
        await dispatch(setLastName(''))
        await dispatch(setEmail(''))
        await dispatch(setPassword(''))
        await dispatch(setMessage(''))
        
        await notes.forEach(sticker => dispatch(removeNote(sticker.id)));
        
        await pendingNotes.forEach(sticker => dispatch(removePendingNote(sticker.id)));

        await auth().signOut()

        await GoogleSignin.revokeAccess()
    } catch (error) {
        console.error("Error during sign-out:", error);
        console.error("Google Sign-In Error Details:", error.toJSON());
    }
};
