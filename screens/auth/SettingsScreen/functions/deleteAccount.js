import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { setShowInput } from "../../../../store/settings/settingsSlice";
setShowInput
import {removeAllFriendsBeforeAccountDelete} from './removeAllFriendsBeforeAccountDelete'
import { removeNote } from "../../../../store/notes/boardSlice";

export const deleteAccount = async ({notes,dispatch,pendingNotes}) => {
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