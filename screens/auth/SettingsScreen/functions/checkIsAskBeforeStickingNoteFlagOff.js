import { MY_EMAIL } from "./constants";
import firestore from '@react-native-firebase/firestore';

export const checkIsAskBeforeStickingNoteFlagOff = async (setAskBeforeStickingNoteFlag) => {
    try {
      const result = await firestore()
      .collection('users')
      .where('email', '==', MY_EMAIL)
      .get()
  
      result.forEach(doc=>{
        data = doc.data().askBeforeStick
      })

      setAskBeforeStickingNoteFlag(data ? true : false);
    } catch (error) {
      console.log('email error',error.message);
    }
  };