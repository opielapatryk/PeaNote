import firestore from '@react-native-firebase/firestore';
import auth, { firebase } from '@react-native-firebase/auth';
import { animate } from "./animate";

export const approveFriend = async (friendEmail,index,animatedValues) =>{
  const EMAIL = auth().currentUser.email

  const getUserByEmail = await firestore()
  .collection('users')
  .where('email', '==', EMAIL)
  .get()
  
  if (!getUserByEmail.empty) {
    getUserByEmail.forEach(doc => {
      if(!doc.data().friends.includes(friendEmail)){
        firestore()
        .collection('users')
        .doc(doc.id)
        .update({
          friends: firebase.firestore.FieldValue.arrayUnion(friendEmail),
        })
        .then(() => {
          firestore()
          .collection('users')
          .doc(doc.id)
          .update({
            friends_requests: firebase.firestore.FieldValue.arrayRemove(friendEmail),
          })
          .then(() => {
            animate(index,animatedValues)
          });
        });
        }
      })
    }

  const getFriendByEmail = await firestore()
  .collection('users')
  .where('email', '==', friendEmail)
  .get()
  
  if (!getFriendByEmail.empty) {
    getFriendByEmail.forEach(doc => {
      if(!doc.data().friends.includes(EMAIL)){
        firestore()
        .collection('users')
        .doc(doc.id)
        .update({
          friends: firebase.firestore.FieldValue.arrayUnion(EMAIL),
        })
        .then(() => {
          firestore()
          .collection('users')
          .doc(doc.id)
          .update({
            friends_requests: firebase.firestore.FieldValue.arrayRemove(EMAIL),
          })
          .then(() => {
            animate(index,animatedValues)
          });
        });
        }
      })
    }
  }