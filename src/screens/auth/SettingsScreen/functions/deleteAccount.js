import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { setShowInput } from "../../../../store/settings/settingsSlice";
setShowInput
import {removeAllFriendsBeforeAccountDelete} from './removeAllFriendsBeforeAccountDelete'
import { removeNote } from "../../../../store/notes/boardSlice";
import { appleAuth } from '@invertase/react-native-apple-authentication';

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
  try {
    if (auth().currentUser.providerData[0].providerId === 'apple.com') {
      await auth().currentUser?.getIdToken?.(true)
      await revokeSignInWithAppleToken();
      const EMAIL = auth().currentUser.email

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
  }else{
      const EMAIL = auth().currentUser.email

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
  }
  } catch (error) {
    if(error.code !== "1001"){
      alert('Log out and log in again, to delete account') 
    }
  }
};