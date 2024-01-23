import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export const askBeforeStick = async ({setAskBeforeStickingNoteFlag}) => {
  const EMAIL = auth().currentUser.email

  const getUserByEmail = await firestore()
  .collection('users')
  .where('email', '==', EMAIL)
  .get()

  getUserByEmail.forEach(doc=>{
    data = doc.data().askBeforeStick

    firestore()
    .collection('users')
    .doc(doc.id)
    .update({
      askBeforeStick: !data,
    })

    setAskBeforeStickingNoteFlag(data ? false : true);
  })
};