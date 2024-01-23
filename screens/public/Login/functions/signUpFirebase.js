import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { setMessage } from '../../../../store/login/loginReducer';

export const signUpFirebase = async (email,password,first_name,last_name,dispatch) =>{
    try {
      const user = await auth().createUserWithEmailAndPassword(email, password);
      user.user.sendEmailVerification();
      if(user.additionalUserInfo.isNewUser){
          firestore()
          .collection('users')
          .add({
            first_name: first_name,
            last_name: last_name,
            email: email,
            friends: [],
            friends_requests: [],
            askBeforeStick: false,
            stickersOnBoard: [],
            pending: []
          })
      }
    } catch (err) {
      if(err.code === "auth/weak-password"){
        dispatch(setMessage('The given password is invalid.'))
      }else if(err.code === "auth/invalid-email"){
        dispatch(setMessage('The email address is badly formatted.'))
      }else if(err.code === "auth/email-already-in-use"){
        dispatch(setMessage('The email address is already in use by another account.'))
      }
    }
  }