import {addNote,addPendingNote} from '../../../../store/notes/boardSlice';
import firestore from '@react-native-firebase/firestore';
import { fetchAndDispatchStickers } from './fetchAndDispatchStickers'
import auth from '@react-native-firebase/auth';

export const fetchNotes = async (dispatch) => {  
  const EMAIL = auth().currentUser.email

  let stickersonboard 
  let pending
  
  const getUserByEmail = await firestore()
    .collection('users')
    .where('email', '==', EMAIL)
    .get()

  const docs = getUserByEmail.docs;

  if (Array.isArray(docs) && docs.length > 0) {
    docs.forEach((doc) => {
      pending = doc.data().pending;
      stickersonboard = doc.data().stickersOnBoard;
    })
  }
  
  fetchAndDispatchStickers(stickersonboard, dispatch, addNote);
  fetchAndDispatchStickers(pending, dispatch, addPendingNote);
};