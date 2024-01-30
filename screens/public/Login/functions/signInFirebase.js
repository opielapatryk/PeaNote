import auth from '@react-native-firebase/auth';
import {setMessage} from '../../../../store/login/loginSlice'

export const signInFirebase = (email,password,dispatch) =>{
  try {
    auth().signInWithEmailAndPassword(email,password).catch((err) => {
      if(err.code === "auth/wrong-password"){
        dispatch(setMessage('Please enter a valid password.'))
      }else if(err.code === "auth/invalid-email"){
        dispatch(setMessage('Please enter a valid email.'))
      }else if(err.code === "auth/invalid-credential"){
        dispatch(setMessage('The supplied credential is wrong or has expired.'))
      }else if(err.code === "auth/too-many-requests"){
        dispatch(setMessage('Access to this account has been temporarily disabled due to many failed login attempts. You can try again later.'))
      }
    })
  } catch (error) {
      dispatch(setMessage(error))
  }
} 