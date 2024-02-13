import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export const checkIsAskBeforeStickingNoteFlagOff = async () => {
  const EMAIL = auth().currentUser.email

  let data 
  
  const getUserByEmail = await firestore()
  .collection('users')
  .where('email', '==', EMAIL)
  .get()

  const docs = getUserByEmail.docs;

  if (Array.isArray(docs) && docs.length > 0) {
    docs.forEach((doc) => {
      data = doc.data().askBeforeStick
    })
  }

  return data ? true : false
};