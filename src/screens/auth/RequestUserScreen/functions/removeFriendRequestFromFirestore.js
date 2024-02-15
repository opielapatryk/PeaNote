import auth, { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { removeRequestReducer } from '../../../../store/friends/friendsSlice';

export const removeFriendRequestFromFirestore = async (friendEmail,friendUsername,dispatch) =>{
  const EMAIL = auth().currentUser.email

  const getUserByEmail = await firestore()
  .collection('users')
  .where('email', '==', EMAIL)
  .get()

  getUserByEmail.forEach(doc=>{
    doc.data().friends_requests.forEach(req=>{
      if(req.email === friendEmail){
        firestore()
        .collection('users')
        .doc(doc.id)
        .update({
          friends_requests: firebase.firestore.FieldValue.arrayRemove({email:friendEmail,username:friendUsername,nickname:""}),
        }).then(() =>{
          dispatch(removeRequestReducer(friendEmail))
        })
      }
    })
  })
}