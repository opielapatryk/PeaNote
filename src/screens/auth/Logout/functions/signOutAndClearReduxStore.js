import {cleanStoreNotes} from '../../../../store/notes/boardSlice';
import auth from '@react-native-firebase/auth';
import { removeMyImage, setShowInput, setShowInputUsername } from '../../../../store/settings/settingsSlice';
import { setEmail,setPassword,setCreateAccount,setMessage } from '../../../../store/login/loginSlice';
import { cleanStoreFriends } from '../../../../store/friends/friendsSlice';
import * as FileSystem from 'expo-file-system';

export const signOutAndClearReduxStore = async (dispatch) => {
    await FileSystem.deleteAsync(FileSystem.cacheDirectory + 'images/');
    await dispatch(setShowInput(false))
    await dispatch(setShowInputUsername(false))
    await dispatch(setCreateAccount(false))
    await dispatch(setEmail(''))
    await dispatch(setPassword(''))
    await dispatch(setMessage(''))
    
    await dispatch(cleanStoreNotes())

    await dispatch(cleanStoreFriends())
    await dispatch(removeMyImage())

    await auth().signOut()
};
