import auth, { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { removeRequestReducer } from '../../../../store/friends/friendsSlice';

export const removeFriendRequestFromFirestore = async (friendEmail,friendUsername,dispatch) =>{
  const EMAIL = auth().currentUser.email

  const getUserByEmail = await firestore()
  .collection('users')
  .where('email', '==', EMAIL)
  .get()

 let USERNAME

  getUserByEmail.forEach(doc=>{
    USERNAME = doc.data().username
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

    // remove pending_requests from friend collection
    const getFriendByEmail = await firestore().collection('users').where('email', '==', friendEmail).get()

    getFriendByEmail.forEach(doc=>{
      doc.data().pending_requests.forEach(req=>{
        if(req.email === EMAIL){
          firestore()
            .collection('users')
            .doc(doc.id)
            .update({
              pending_requests: firebase.firestore.FieldValue.arrayRemove({email:EMAIL,username:USERNAME,nickname:''}),
            })
        }
      })
    })
}