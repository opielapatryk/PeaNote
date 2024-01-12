import { MY_EMAIL } from "../../../constants";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export const deleteAccount = async (notes,dispatch_redux,pendingNotes) => {
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
              notes.forEach(sticker => dispatch_redux(removeNote(sticker.id)));
              pendingNotes.forEach(sticker => dispatch_redux(removePendingNote(sticker.id)));
              auth().currentUser.delete()
            } catch (error) {
                console.error(error);
            }
          });
        })})

    } catch (error) {
      console.log('email error',error.message);
    }
  };