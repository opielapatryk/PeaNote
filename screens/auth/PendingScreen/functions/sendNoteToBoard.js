import auth, { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export async function sendNoteToBoard(content,creator){
  const EMAIL = auth().currentUser.email

  // get current user collection to take action on in next step
  const getUserByEmail = await firestore()
  .collection('users')
  .where('email', '==', EMAIL)
  .get()

  // ADD STICKER TO BOARD 
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
}