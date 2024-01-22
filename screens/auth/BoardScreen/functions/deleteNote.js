import auth, { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

let numberOfDeleted = 0
export const deleteNote = async (id) => {
  const EMAIL = auth().currentUser.email
  // TAKE STICKERS ON BOARD
  let stickersonboard

  const getUserByEmail = await firestore()
  .collection('users')
  .where('email', '==', EMAIL)
  .get()

  getUserByEmail.forEach(doc=>{
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
  getUserByEmail.forEach(doc => {
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
}