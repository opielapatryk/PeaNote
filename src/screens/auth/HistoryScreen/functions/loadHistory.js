import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export const loadHistory = async (dispatch)=>{
  const EMAIL = auth().currentUser.email

  const getUserByEmail = await firestore()
    .collection('users')
    .where('email', '==', EMAIL)
    .get()
  
  const docs = getUserByEmail.docs

  if (Array.isArray(docs) && docs.length > 0) {
    docs.forEach((doc) => {
      friends = doc.data().friends;
      requests = doc.data().friends_requests;
    })
  }
}