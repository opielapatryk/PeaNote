import firestore from '@react-native-firebase/firestore';
import auth, { firebase } from '@react-native-firebase/auth';
import { removeRequestReducer, setFriends } from '../../../../store/friends/friendsSlice';

export const approveFriend = async (friendEmail,friendUsername,dispatch,navigation) =>{
  const EMAIL = auth().currentUser.email

  let USERNAME 

  const getUserByEmail = await firestore()
  .collection('users')
  .where('email', '==', EMAIL)
  .get()
  
  if (!getUserByEmail.empty) {
    getUserByEmail.forEach(doc => {
      USERNAME = doc.data().username
      
      if(!doc.data().friends.includes({email:friendEmail,username:friendUsername})){
        console.log('inside');
        firestore()
        .collection('users')
        .doc(doc.id)
        .update({
          friends: firebase.firestore.FieldValue.arrayUnion({email:friendEmail,username:friendUsername}),
        })
        .then(() => {
          firestore()
          .collection('users')
          .doc(doc.id)
          .update({
            friends_requests: firebase.firestore.FieldValue.arrayRemove({email:friendEmail,username:friendUsername}),
          })
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
      if(!doc.data().friends.includes({email:EMAIL,username:USERNAME})){
        firestore()
        .collection('users')
        .doc(doc.id)
        .update({
          friends: firebase.firestore.FieldValue.arrayUnion({email:EMAIL,username:USERNAME}),
        })
        .then(() => {
          firestore()
          .collection('users')
          .doc(doc.id)
          .update({
            friends_requests: firebase.firestore.FieldValue.arrayRemove({email:EMAIL,username:USERNAME}),
          })

          dispatch(removeRequestReducer(friendEmail))
          dispatch(setFriends(friendEmail))
          navigation.navigate('FriendsScreen');
          
        });
        }
      })
    }
  }