import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export const checkIsAskBeforeStickingNoteFlagOff = async ({setAskBeforeStickingNoteFlag}) => {
  const EMAIL = auth().currentUser.email

  let data 
  
  const result = await firestore()
  .collection('users')
  .where('email', '==', EMAIL)
  .get()

  const docs = result.docs;

  if (Array.isArray(docs) && docs.length > 0) {
    docs.forEach((doc) => {
      data = doc.data().askBeforeStick
    })
  }

  setAskBeforeStickingNoteFlag(data ? true : false);
};