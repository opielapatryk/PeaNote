import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { setMessage } from '../../../../store/login/loginSlice';

export const signUpFirebase = async (email,password,dispatch) =>{
    try {
      const user = await auth().createUserWithEmailAndPassword(email, password);
      // user.user.sendEmailVerification();
      if(user.additionalUserInfo.isNewUser){
          firestore()
          .collection('users')
          .add({
            email: email,
            username: '',
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
        setTimeout(() => {
          dispatch(setMessage(''))
        }, 2000);
      }else if(err.code === "auth/invalid-email"){
        dispatch(setMessage('Please enter a valid email.'))
        setTimeout(() => {
          dispatch(setMessage(''))
        }, 2000);
      }else if(err.code === "auth/email-already-in-use"){
        dispatch(setMessage('Email has already been taken.'))
        setTimeout(() => {
          dispatch(setMessage(''))
        }, 2000);
      }
    }
  }