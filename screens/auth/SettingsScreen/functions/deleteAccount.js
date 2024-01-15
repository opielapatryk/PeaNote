import { MY_EMAIL } from "../../../constants";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { setShowInput } from "../../../../store/settings/settingsSlice";
setShowInput

export const deleteAccount = async ({notes,dispatch,pendingNotes}) => {
    try {
      firestore()
      .collection('users')
      .where('email', '==', MY_EMAIL)
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

    } catch (error) {
      console.log('[deleteAccount.js] email error',error.message);
    }
  };