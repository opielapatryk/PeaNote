import { isEmail } from "./isEmail";
import firestore from '@react-native-firebase/firestore';

export const getDescription = async (email) =>{
    if(isEmail(email)){
      const emailSnapshot = await firestore()
      .collection('users')
      .where('email', '==', email)
      .get();

      return emailSnapshot.docs[0].data().description
    }else{
      const usernameSnapshot = await firestore()
      .collection('users')
      .where('username', '==', email)
      .get();

      return usernameSnapshot.docs[0].data().description
    }
  }