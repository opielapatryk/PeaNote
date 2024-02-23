import auth from '@react-native-firebase/auth';
import {firebase} from '@react-native-firebase/database'
import { setMessage,setEmail,setPassword,setCreateAccount } from '../../../store/login/loginSlice';

export const signUpFirebase = async (email,password,dispatch) =>{
    try {
      const user = await auth().createUserWithEmailAndPassword(email, password)

      await user.user.sendEmailVerification()

      const ref = firebase.app().database('https://stickify-407810-default-rtdb.europe-west1.firebasedatabase.app/').ref('/users').push();

      await ref
      .set({
        email:email,
        username:email,
        description:'',
        askBeforeStick:false,
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