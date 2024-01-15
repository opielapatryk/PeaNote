import {addNote,addPendingNote} from '../../../store/notes/boardSlice';
import firestore from '@react-native-firebase/firestore';
import { fetchAndDispatchStickers } from './fetchAndDispatchStickers'
import { MY_EMAIL } from '../../constants';

export const fetchNotes = async (dispatch) => {  
    try {
      let stickersonboard 
      let pending
      
      const doc = (await firestore()
      .collection('users')
      .where('email', '==', MY_EMAIL)
      .get()).docs[0];
  
      pending = doc.data().pending;
      stickersonboard = doc.data().stickersOnBoard;
      
      
      await fetchAndDispatchStickers(stickersonboard, dispatch, addNote);
      await fetchAndDispatchStickers(pending, dispatch, addPendingNote);
    } catch (error) {
      console.log(error);
    }
  };