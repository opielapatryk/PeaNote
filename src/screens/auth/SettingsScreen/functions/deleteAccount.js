import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { setShowInput, showModal } from "../../../../store/settings/settingsSlice";
setShowInput
import {removeAllFriendsBeforeAccountDelete} from './removeAllFriendsBeforeAccountDelete'
import { removeNote } from "../../../../store/notes/boardSlice";
import { appleAuth } from '@invertase/react-native-apple-authentication';
import { GoogleSignin} from '@react-native-google-signin/google-signin';

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
    console.log('try');
    if (auth().currentUser.providerData[0].providerId === 'apple.com') {
      console.log('apple');
      await auth().currentUser?.getIdToken?.(true)
      await revokeSignInWithAppleToken();
    }else if(auth().currentUser.providerData[0].providerId === 'google.com'){
      console.log('google');
      const {idToken} = await GoogleSignin.signIn()
      const googleCredential = auth.GoogleAuthProvider.credential(idToken)
      await auth().currentUser.reauthenticateWithCredential(googleCredential)
    }

    // remove this account from friends lists
    await removeAllFriendsBeforeAccountDelete()
  
    // delete this account
    const getUserByEmail = await firestore()
    .collection('users')
    .where('email', '==', EMAIL)
    .get()
  
    const docs = getUserByEmail.docs
  
    if(Array.isArray(docs) && docs.length > 0) {
      let doc = docs[0];
  
      await firestore()
      .collection('users')
      .doc(doc.id)
      .delete()
  
      auth().currentUser.delete()
      notes.forEach(sticker => dispatch(removeNote(sticker.id)));
      pendingNotes.forEach(sticker => dispatch(removePendingNote(sticker.id)));
      dispatch(setShowInput(false))
    }
  } catch (error) {
    if(error.code === 'auth/user-mismatch'){
      alert('The supplied credentials do not correspond to the previously signed in user.') 
    }
    if(error.code ==='auth/requires-recent-login'){
      dispatch(showModal(true))
    }
  }
};