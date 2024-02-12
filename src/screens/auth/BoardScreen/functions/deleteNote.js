import auth, { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export async function deleteNote(content,creator){
  const EMAIL = auth().currentUser.email

  const getUserByEmail = await firestore()
  .collection('users')
  .where('email', '==', EMAIL)
  .get()

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