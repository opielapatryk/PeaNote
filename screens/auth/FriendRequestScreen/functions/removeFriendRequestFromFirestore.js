import auth, { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { removeRequestReducer } from '../../../../store/friends/friendsSlice';

export const removeFriendRequestFromFirestore = async (friendEmail,dispatch,navigation) =>{
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
      }).then(() =>{
        dispatch(removeRequestReducer(friendEmail))
        navigation.navigate('FriendsScreen'); // Change for some animation instead of navigation to previous screen.
      })
    }
  })
}