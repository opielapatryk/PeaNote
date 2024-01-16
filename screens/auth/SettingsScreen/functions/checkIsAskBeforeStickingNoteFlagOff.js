import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export const checkIsAskBeforeStickingNoteFlagOff = async ({setAskBeforeStickingNoteFlag}) => {
  const EMAIL = auth().currentUser.email
    try {
      let data 
      
      const result = await firestore()
      .collection('users')
      .where('email', '==', EMAIL)
      .get()
  
      result.forEach(doc=>{
        data = doc.data().askBeforeStick
      })

      setAskBeforeStickingNoteFlag(data ? true : false);
    } catch (error) {
      console.log('[checkIsAskBeforeStickingNoteFlagOff.js] email error',error.message);
    }
  };