import {addNote,changeInfo,addPendingNote} from '../../../store/notes/boardSlice';
import auth, { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const fetchNotes = async (dispatch) => {  
  try {
    let stickersonboard 
    let pending

    const MY_EMAIL = auth().currentUser.email

    
    const result = await firestore()
    .collection('users')
    .where('email', '==', MY_EMAIL)
    .get()

    result.forEach(doc=>{
      pending = doc.data().pending
      stickersonboard = doc.data().stickersOnBoard
    })
    
    await fetchAndDispatchStickers(stickersonboard, dispatch, addNote);
    await fetchAndDispatchStickers(pending, dispatch, addPendingNote);
  } catch (error) {
    console.log(error);
  }
};

const fetchAndDispatchStickers = async (stickers, dispatch, addNoteAction) => {
  if(stickers){
    stickers.forEach((sticker,index) => dispatch(addNoteAction({ id: index + 1, text: sticker.content, isInfo: false })));
  }
};

export const checkThenChangeInfo = (dispatch, notes) => {
    notes.map((note) => {
      if(note.isInfo === true)
      {
        dispatch(changeInfo(note.id))
      }
    })
  }