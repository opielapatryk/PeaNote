import firestore from '@react-native-firebase/firestore';

export const isEmail = async (friendEmail) =>{
    const emailSnapshot = await firestore().collection('users').where('email','==',friendEmail).get()

    if(emailSnapshot.empty){
      return false;
    }else{
      return true;
    }
  }