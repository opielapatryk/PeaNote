import auth, { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const removeFriendRequestFromFirestore = async (friendEmail) =>{
  const EMAIL = auth().currentUser.email

  const getUserByEmail = await firestore()
  .collection('users')
  .where('email', '==', EMAIL)
  .get()

  getUserByEmail.forEach(doc=>{
    if(doc.data().friends_requests.includes(friendEmail)){
      firestore()
      .collection('users')
      .doc(doc.id)
      .update({
        friends_requests: firebase.firestore.FieldValue.arrayRemove(friendEmail),
      })
    }
  })
}