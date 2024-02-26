import {addNote,addPendingNote} from '../../../../store/notes/boardSlice';
import { fetchAndDispatchStickers } from './fetchAndDispatchStickers'
import auth from '@react-native-firebase/auth';
import { firebase } from '@react-native-firebase/database';

export const fetchNotes = async (dispatch) => {  
  const EMAIL = auth().currentUser.email

  const usersRef = firebase.app().database('https://stickify-407810-default-rtdb.europe-west1.firebasedatabase.app/').ref('users');

  const snapshot = await usersRef.orderByChild('email').equalTo(EMAIL).once('value');

  const userData = snapshot.val();

  const userId = Object.keys(userData)[0];

  let notes = userData[userId].notes;
  let stickersonboard = []
  let pending = []

  notes.forEach(note => {
    if(note.pending){
      pending.push(note)
    }else{
      stickersonboard.push(note)
    }
  });
  
  fetchAndDispatchStickers(stickersonboard, dispatch, addNote);
  fetchAndDispatchStickers(pending, dispatch, addPendingNote);
};