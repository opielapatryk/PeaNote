import { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { removeFriendReducer } from '../../../../store/friends/friendsSlice';

export const removeFriend = async (navigation,friendEmail,dispatch) => {
  const EMAIL = auth().currentUser.email

  const getUserByEmail = await firestore()
      .collection('users')
      .where('email', '==', EMAIL)
      .get()


  getUserByEmail.forEach(doc => {
    firestore()
    .collection('users')
    .doc(doc.id)
    .update({
      friends: firebase.firestore.FieldValue.arrayRemove(friendEmail),
    })
  })

  const getFriendByEmail = await firestore()
    .collection('users')
    .where('email', '==', friendEmail)
    .get()


    getFriendByEmail.forEach(doc => {
          firestore()
          .collection('users')
          .doc(doc.id)
          .update({
            friends: firebase.firestore.FieldValue.arrayRemove(EMAIL),
          })
          .then(()=>{
            dispatch(removeFriendReducer(friendEmail))
            navigation.navigate('FriendsScreen');
          })
        })
  };