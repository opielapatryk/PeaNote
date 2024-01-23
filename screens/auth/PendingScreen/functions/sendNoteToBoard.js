import {removePendingNote, addNote} from '../../../../store/notes/boardSlice';
import auth, { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { animate } from './animate';

let numberOfDeleted = 0
export async function sendNoteToBoard(itemID,dispatch,index,animatedValues){
  const EMAIL = auth().currentUser.email

  let pending
  let content
  let creator

  // get current user collection to take action on in next step
  const getUserByEmail = await firestore()
  .collection('users')
  .where('email', '==', EMAIL)
  .get()

  // create list of pending note to iterate over in next step
  getUserByEmail.forEach(doc=>{
    pending = doc.data().pending
  })

  // ITERATE OVER PENDING NOTES 
  pending.forEach((sticker,index) => {
    index = index + 1
    let sum = itemID - numberOfDeleted
    if(index === sum){
      creator = sticker.creator
      content = sticker.content
    }
  })

  numberOfDeleted++

  getUserByEmail.forEach(doc => {
    firestore()
    .collection('users')
    .doc(doc.id)
    .update({
      stickersOnBoard: firebase.firestore.FieldValue.arrayUnion({
        content: content,
        creator: creator,
      }),
    })
  })
  
  // REMOVE STICKER FROM PENDING 
  getUserByEmail.forEach(doc => {
    firestore()
    .collection('users')
    .doc(doc.id)
    .update({
      pending: firebase.firestore.FieldValue.arrayRemove({
        content: content,
        creator: creator,
      }),
    })
  })

  // MANAGE REDUX STORE
  animate(index,()=>dispatch(addNote({ id: itemID, text: content, isInfo: false })),()=>dispatch(removePendingNote(itemID)),animatedValues);
}