import { setShowInput, showModal } from "../../../../store/settings/settingsSlice";
setShowInput
import {removeAllFriendsBeforeAccountDelete} from './removeAllFriendsBeforeAccountDelete'
import { removeNote } from "../../../../store/notes/boardSlice";
import { appleAuth } from '@invertase/react-native-apple-authentication';
import { GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { firebase } from '@react-native-firebase/database';

async function revokeSignInWithAppleToken() {
  const { authorizationCode } = await appleAuth.performRequest({
    requestedOperation: appleAuth.Operation.REFRESH,
  });

  if (!authorizationCode) {
    throw new Error('Apple Revocation failed - no authorizationCode returned');
  }

  return auth().revokeToken(authorizationCode);
}


export const deleteAccount = async ({notes,dispatch,pendingNotes}) => {
  const EMAIL = auth().currentUser.email
  
  try {
    if (auth().currentUser.providerData[0].providerId === 'apple.com') {
      await auth().currentUser?.getIdToken?.(true)
      await revokeSignInWithAppleToken();
    }else if(auth().currentUser.providerData[0].providerId === 'google.com'){
      const {idToken} = await GoogleSignin.signIn()
      const googleCredential = auth.GoogleAuthProvider.credential(idToken)
      await auth().currentUser.reauthenticateWithCredential(googleCredential)
    }

    // remove this account from friends lists
    await removeAllFriendsBeforeAccountDelete()
  
    // delete this account
    const database = firebase.app().database('https://stickify-407810-default-rtdb.europe-west1.firebasedatabase.app/');
    const usersRef = database.ref('users');
  
    const snapshot = await usersRef.orderByChild('email').equalTo(EMAIL).once('value');
    const userData = snapshot.val();

    if (userData) {
      const userId = Object.keys(userData)[0];

      await usersRef.child(userId).remove();
    }

    // Delete the user from authentication
    await auth().currentUser.delete();
    notes.forEach(sticker => dispatch(removeNote(sticker.id)));
    pendingNotes.forEach(sticker => dispatch(removePendingNote(sticker.id)));
    dispatch(setShowInput(false))
  } catch (error) {
    if(error.code === 'auth/user-mismatch'){
      alert('The supplied credentials do not correspond to the previously signed in user.') 
    }
    if(error.code ==='auth/requires-recent-login'){
      dispatch(showModal(true))
    }
  }
};