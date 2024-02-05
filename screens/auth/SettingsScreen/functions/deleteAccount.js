import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { setShowInput } from "../../../../store/settings/settingsSlice";
setShowInput
import {removeAllFriendsBeforeAccountDelete} from './removeAllFriendsBeforeAccountDelete'
import { removeNote } from "../../../../store/notes/boardSlice";
import { appleAuth } from '@invertase/react-native-apple-authentication';

async function revokeSignInWithAppleToken() {
  // Get an authorizationCode from Apple
  const { authorizationCode } = await appleAuth.performRequest({
    requestedOperation: appleAuth.Operation.REFRESH,
  });

  // Ensure Apple returned an authorizationCode
  if (!authorizationCode) {
    throw new Error('Apple Revocation failed - no authorizationCode returned');
  }

  // Revoke the token
  return auth().revokeToken(authorizationCode);
}

export const deleteAccount = async ({notes,dispatch,pendingNotes}) => {
  // revokeSignInWithAppleToken()
  
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
};