import {cleanStoreNotes,showAddNoteModal} from '../../../../store/notes/boardSlice';
import auth from '@react-native-firebase/auth';
import { removeMyImage, setShowInput, setShowInputUsername } from '../../../../store/settings/settingsSlice';
import { setEmail,setPassword,setCreateAccount,setMessage } from '../../../../store/login/loginSlice';
import { cleanStoreFriends } from '../../../../store/friends/friendsSlice';
import * as FileSystem from 'expo-file-system';
import {firebase} from '@react-native-firebase/database'

export const signOutAndClearReduxStore = async (dispatch) => {
    const EMAIL = auth().currentUser.email
    const usersRef = firebase.app().database('https://stickify-407810-default-rtdb.europe-west1.firebasedatabase.app/').ref('users');

    const snapshot = await usersRef.orderByChild('email').equalTo(EMAIL).once('value');

    const userData = snapshot.val();
  
    if (userData) {
        const userId = Object.keys(userData)[0];
        await usersRef.child(`${userId}/pushToken`).set('');
    }

    await FileSystem.deleteAsync(FileSystem.cacheDirectory + 'images/');
    await dispatch(setShowInput(false))
    await dispatch(setShowInputUsername(false))
    await dispatch(setCreateAccount(false))
    await dispatch(showAddNoteModal(false))

    await dispatch(setEmail(''))
    await dispatch(setPassword(''))
    await dispatch(setMessage(''))
    
    await dispatch(cleanStoreNotes())

    await dispatch(cleanStoreFriends())
    await dispatch(removeMyImage())

    await auth().signOut()
};
