import {removePendingNote, addNote} from '../../../../store/notes/boardSlice';
import auth, { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { animate } from './animate';

let numberOfDeleted = 0
export async function sendNoteToBoard(itemID,dispatch,index,animatedValues){
  const EMAIL = auth().currentUser.email
    try {
      // TAKE STICKER CONTENT AND CREATOR 
      // create variable of pending notes
      let pending
      let content
      let creator

      // get current user collection to take action on in next step
      const result = await firestore()
      .collection('users')
      .where('email', '==', EMAIL)
      .get()
  
      // create list of pending note to iterate over in next step
      result.forEach(doc=>{
        pending = doc.data().pending
      })

      // ITERATE OVER PENDING NOTES 
      pending.forEach((sticker,index) => {
        index = index + 1
        let sum = itemID - numberOfDeleted
        if(index === sum){
          // take creator and content from clicked pending note
          creator = sticker.creator
          content = sticker.content
        }
      })
      numberOfDeleted++
      // ADD THIS NOTE TO NOTESONBOARD
      firestore()
      .collection('users')
      .where('email', '==', EMAIL)
      .get()
      .then((querySnapshot)=>{
        querySnapshot.forEach(doc => {
          firestore()
          .collection('users')
          .doc(doc.id)
          .update({
            stickersOnBoard: firebase.firestore.FieldValue.arrayUnion({
              content: content,
              creator: creator,
            }),
          }).then(() => {console.log('note added to board on screen in firestore');})
        })
      })
      
      // REMOVE STICKER FROM PENDING 
      firestore()
      .collection('users')
      .where('email', '==', EMAIL)
      .get()
      .then((querySnapshot)=>{
        querySnapshot.forEach(doc => {
          firestore()
          .collection('users')
          .doc(doc.id)
          .update({
            pending: firebase.firestore.FieldValue.arrayRemove({
              content: content,
              creator: creator,
            }),
          }).then(()=>{console.log('note removed from firestore');})
        })
      })

      // MANAGE REDUX STORE
      animate(index,()=>dispatch(addNote({ id: itemID, text: content, isInfo: false })),()=>dispatch(removePendingNote(itemID)),animatedValues);

    } catch (error) {
      console.log('[sendNoteToBoard.js ]',error.message);
    }
}

