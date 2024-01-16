import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export const askBeforeStick = async ({setAskBeforeStickingNoteFlag,setMessage}) => {
  const EMAIL = auth().currentUser.email
    try {  
      const result = await firestore()
      .collection('users')
      .where('email', '==', EMAIL)
      .get()
  
      result.forEach(doc=>{
        data = doc.data().askBeforeStick
      })
  
      firestore()
      .collection('users')
      .where('email', '==', EMAIL)
      .get()
      .then((querySnapshot)=>{
        querySnapshot.forEach(doc => {
          firestore()
          .collection('users')
          .doc(doc.id)
          .update({
            askBeforeStick: !data,
          })
          .then(()=>{
            setAskBeforeStickingNoteFlag(data ? false : true);
          })
        })
      })
    } catch (error) {
      setMessage('Something went wrong! Try again later..');
      console.log('[askBeforeStick.js] email error: ',error.message);
    }
  };