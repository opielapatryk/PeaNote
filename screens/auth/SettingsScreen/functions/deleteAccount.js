import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { setShowInput } from "../../../../store/settings/settingsSlice";
setShowInput
import {removeAllFriendsBeforeAccountDelete} from './removeAllFriendsBeforeAccountDelete'
import { removeNote } from "../../../../store/notes/boardSlice";

export const deleteAccount = async ({notes,dispatch,pendingNotes}) => {
  const EMAIL = auth().currentUser.email
    try {
      console.log('trying to delete account');
      // remove this account from friends lists
      await removeAllFriendsBeforeAccountDelete()

      // delete this account
      firestore()
      .collection('users')
      .where('email', '==', EMAIL)
      .get()
      .then((querySnapshot)=>{
        querySnapshot.forEach(doc => {
          firestore()
          .collection('users')
          .doc(doc.id)
          .delete()
          .then(async () => {
            try {
              notes.forEach(sticker => dispatch(removeNote(sticker.id)));
              pendingNotes.forEach(sticker => dispatch(removePendingNote(sticker.id)));
              dispatch(setShowInput(false))
              auth().currentUser.delete()
            } catch (error) {
                console.error(error);
            }
          });
        })})
        console.log('account deleted');

    } catch (error) {
      console.log('[deleteAccount.js] email error',error.message);
    }
  };