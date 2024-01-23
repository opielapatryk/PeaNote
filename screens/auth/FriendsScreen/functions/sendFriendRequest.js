import { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export const sendFriendRequest = async (newFriendEmail,setNewFriendEmail,setButtonTitle,setFriendReqMessage) => {
  const EMAIL = auth().currentUser.email;

  const getUserByEmail = await firestore()
  .collection('users')
  .where('email', '==', EMAIL)
  .get()

  const docs = getUserByEmail.docs

  if(Array.isArray(docs) && docs.length > 0) {
    let doc = docs[0];

    if(!doc.data().friends.includes(newFriendEmail)){
      const getNewFriendByEmail = await firestore()
      .collection('users')
      .where('email', '==', newFriendEmail)
      .get()

      const docs = getNewFriendByEmail.docs

      if(Array.isArray(docs) && docs.length > 0) {
        let doc = docs[0];

        if(!doc.data().friends_requests.includes(EMAIL)){
          await firestore()
          .collection('users')
          .doc(doc.id)
          .update({
            friends_requests: firebase.firestore.FieldValue.arrayUnion(EMAIL),
          })

          setNewFriendEmail('')
          setButtonTitle('')
          setFriendReqMessage(true)
        }
      }
    }
  }
}