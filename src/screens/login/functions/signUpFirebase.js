import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { setMessage,setEmail,setPassword,setCreateAccount } from '../../../store/login/loginSlice';

export const signUpFirebase = async (email,password,dispatch) =>{
    try {
      const user = await auth().createUserWithEmailAndPassword(email, password)

      await user.user.sendEmailVerification()

      await firestore()
      .collection('users')
      .add({
        username: email,
        email: email,
        friends: [],
        friends_requests: [],
        pending_requests: [],
        askBeforeStick: false,
        stickersOnBoard: [],
        pending: [],
        description: '',
      })

      auth().signOut()

      await dispatch(setCreateAccount(false))
      await dispatch(setEmail(''))
      await dispatch(setPassword(''))
      await dispatch(setMessage(''))

      alert('Confirm email before login')
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