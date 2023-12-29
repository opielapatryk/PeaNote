import { userLink } from '../../../components/Constants';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { removeNote } from '../../../store/notes/boardSlice';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const checkIsAskBeforeStickingNoteFlagOff = async (setAskBeforeStickingNoteFlag) => {
    try {
      const MY_EMAIL = auth().currentUser.email

      const result = await firestore()
      .collection('users')
      .where('email', '==', MY_EMAIL)
      .get()
  
      result.forEach(doc=>{
        data = doc.data().askBeforeStick
      })

      setAskBeforeStickingNoteFlag(data ? true : false);
    } catch (error) {
      console.log(error.message);
    }
  };

export const askBeforeStick = async (setAskBeforeStickingNoteFlag,setMessage) => {
  try {
    const MY_EMAIL = auth().currentUser.email

    const result = await firestore()
    .collection('users')
    .where('email', '==', MY_EMAIL)
    .get()

    result.forEach(doc=>{
      data = doc.data().askBeforeStick
    })

    firestore()
    .collection('users')
    .where('email', '==', MY_EMAIL)
    .get()
    .then((querySnapshot)=>{
      querySnapshot.forEach(doc => {
        firestore()
        .collection('users')
        .doc(doc.id)
        .update({
          askBeforeStick: !data,
        })
        .then(()=>{
          setAskBeforeStickingNoteFlag(data ? false : true);
        })
      })
    })
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