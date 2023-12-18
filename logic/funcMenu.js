import {removeNote,removePendingNote} from '../store/notes/boardSlice';
import { FIREBASE_AUTH } from '../FIrebaseConfig';
import { GoogleSignin} from '@react-native-google-signin/google-signin';
import AsyncStorage from "@react-native-async-storage/async-storage";

export const signOutAndClearReduxStore = (notes,dispatch_redux,pendingNotes) => {
    FIREBASE_AUTH.signOut()
    notes.forEach(sticker => dispatch_redux(removeNote(sticker.id)));
    pendingNotes.forEach(sticker => dispatch_redux(removePendingNote(sticker.id)));
    AsyncStorage.removeItem("@userEmail")
    AsyncStorage.removeItem("@userFamilyName")
    AsyncStorage.removeItem("@userGivenName")
    AsyncStorage.removeItem("@userId")
    AsyncStorage.removeItem("@userName")
    AsyncStorage.removeItem("@idToken")
};