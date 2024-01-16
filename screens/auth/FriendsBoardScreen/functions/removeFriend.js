import { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export const removeFriend = async (navigation,friendEmail) => {
  const EMAIL = auth().currentUser.email
    try {
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
                friends: firebase.firestore.FieldValue.arrayRemove(friendEmail),
              })
            })
          })

          firestore()
          .collection('users')
          .where('email', '==', friendEmail)
          .get()
          .then((querySnapshot)=>{
            querySnapshot.forEach(doc => {
              firestore()
              .collection('users')
              .doc(doc.id)
              .update({
                friends: firebase.firestore.FieldValue.arrayRemove(EMAIL),
              })
              .then(()=>{
                navigation.navigate('FriendsScreen');
              })
            })
          })
    } catch (error) {
      console.log(error.message);
    }
  };