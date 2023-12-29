import { userLink } from '../../../components/Constants';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { removeNote } from '../../../store/notes/boardSlice';
import auth, { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { GoogleSignin} from '@react-native-google-signin/google-signin';

export const checkIsAskBeforeStickingNoteFlagOff = async (setAskBeforeStickingNoteFlag) => {
    try {
      let userID = await SecureStore.getItemAsync('userId');
      const resp = await axios.get(userLink(userID));
      const data = resp.data.askBeforeStick;
      setAskBeforeStickingNoteFlag(data ? true : false);
    } catch (error) {
      console.log(error.message);
    }
  };

export const askBeforeStick = async (setAskBeforeStickingNoteFlag,setMessage) => {
  try {
    let userID = await SecureStore.getItemAsync('userId');
    const resp = await axios.get(userLink(userID));
    const data = resp.data.askBeforeStick;
    const patchRequest = await axios.patch(userLink(userID), {
      askBeforeStick: !data,
    });

    if (patchRequest.status && patchRequest.status === 200) {
      setAskBeforeStickingNoteFlag(data ? false : true);
    }
  } catch (error) {
    setMessage('Something went wrong! Try again later..');
    console.log(error.message);
  }
};

 export const deleteAccount = async (notes,dispatch_redux,pendingNotes) => {
    try {
      const MY_EMAIL = auth().currentUser.email

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
      console.log(error.message);
    }
  };

 export const changePassword = async (setConfirmAccountDelete,newPassword,setMessage) => {
    setConfirmAccountDelete(false);
    try {
      await auth().currentUser.updatePassword(newPassword)
      setMessage('Password updated!');
    } catch (error) {
      if (error) {
        setMessage('Something went wrong! Try providing a different password!');
      }
      console.log(error.message);
    }
  };

  export const removeNotesFromReduxStore = async (notes,dispatchRedux) => {
    await Promise.all(notes.map((sticker) => dispatchRedux(removeNote(sticker.id))));
  };