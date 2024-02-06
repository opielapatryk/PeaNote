import { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { removeFriendReducer } from '../../../../store/friends/friendsSlice';

export const removeFriend = async (navigation,friendEmail,username,dispatch) => {
  const EMAIL = auth().currentUser.email
  
  let USERNAME
  const getUserByEmail = await firestore()
      .collection('users')
      .where('email', '==', EMAIL)
      .get()


  getUserByEmail.forEach(doc => {
    USERNAME = doc.data().username

    firestore()
    .collection('users')
    .doc(doc.id)
    .update({
      friends: firebase.firestore.FieldValue.arrayRemove({email:friendEmail,username:username}),
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
            friends: firebase.firestore.FieldValue.arrayRemove({email:EMAIL,username:USERNAME}),
          })
          .then(()=>{
            dispatch(removeFriendReducer(friendEmail))
            navigation.navigate('FriendsScreen');
          })
        })
  };