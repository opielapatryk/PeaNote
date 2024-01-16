import {addNote,addPendingNote} from '../../../../src/store/notes/boardSlice';
import firestore from '@react-native-firebase/firestore';
import { fetchAndDispatchStickers } from './fetchAndDispatchStickers'
import auth from '@react-native-firebase/auth';

export const fetchNotes = async (dispatch) => {  
  const EMAIL = auth().currentUser.email
    try {
      let stickersonboard 
      let pending
      
      const result = await firestore()
      .collection('users')
      .where('email', '==', EMAIL)
      .get()
  
      result.forEach(doc=>{
        pending = doc.data().pending
        stickersonboard = doc.data().stickersOnBoard
      })
      

      fetchAndDispatchStickers(stickersonboard, dispatch, addNote);
      fetchAndDispatchStickers(pending, dispatch, addPendingNote);
    } catch (error) {
      console.log('[fetchNotes.js] ',error);
    }
  };