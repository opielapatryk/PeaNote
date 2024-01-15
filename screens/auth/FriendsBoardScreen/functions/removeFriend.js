import { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {MY_EMAIL} from '../../../constants'

export const removeFriend = async (navigation,friendEmail) => {
    try {
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
                friends: firebase.firestore.FieldValue.arrayRemove(MY_EMAIL),
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