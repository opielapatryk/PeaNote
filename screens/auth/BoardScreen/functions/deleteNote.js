import { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { MY_EMAIL } from '../../../constants';

let numberOfDeleted = 0
export const deleteNote = async (id) => {
    try {
        // TAKE STICKERS ON BOARD
        let stickersonboard

        const result = await firestore()
        .collection('users')
        .where('email', '==', MY_EMAIL)
        .get()
    
        result.forEach(doc=>{
            stickersonboard = doc.data().stickersOnBoard
        })
  
        // ITERATE OVER STICKERS ON BOARD
  
        stickersonboard.forEach((sticker,index) => {
          index = index + 1
          let sum = id - numberOfDeleted
          if(index === sum){
            creator = sticker.creator
            content = sticker.content
          }
        })
        numberOfDeleted++

         // REMOVE STICKER FROM FIRESTORE 
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
            stickersOnBoard: firebase.firestore.FieldValue.arrayRemove({
                content: content,
                creator: creator,
            }),
            })
        })
        })
    } catch (error) {
      console.log('[deleteNote.js] ',error.message);
    }
}


