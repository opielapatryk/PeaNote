import auth from '@react-native-firebase/auth';
import {setMessage} from '../../../../store/login/loginReducer'

export const signInFirebase = (email,password,dispatch) =>{
    try {
      auth().signInWithEmailAndPassword(email,password).catch((err) => {
        console.log(err)
        if(err.code === "auth/wrong-password"){
          dispatch(setMessage('The password is invalid, try again.'))
        }else if(err.code === "auth/invalid-email"){
          dispatch(setMessage('The email is invalid, try again.'))
        }else if(err.code === "auth/invalid-credential"){
          dispatch(setMessage('The supplied credential is wrong or has expired.'))
        }else if(err.code === "auth/too-many-requests"){
          dispatch(setMessage('Access to this account has been temporarily disabled due to many failed login attempts. You can try again later.'))
        }
      })
    } catch (error) {
        dispatch(setMessage(error))
        console.log(error);
    }
  } 