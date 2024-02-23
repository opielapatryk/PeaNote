import auth from '@react-native-firebase/auth';
import { GoogleSignin} from '@react-native-google-signin/google-signin';
import { showModal } from '../../../store/login/loginSlice';
import {firebase} from '@react-native-firebase/database'


export const signIn = async (dispatch)=>{
  const {idToken} = await GoogleSignin.signIn()
  const googleCredential = auth.GoogleAuthProvider.credential(idToken)
  const user_sign_in = await auth().signInWithCredential(googleCredential)
  

  if(user_sign_in.additionalUserInfo.isNewUser){
    await dispatch(showModal(true))

    const ref = firebase.app().database('https://stickify-407810-default-rtdb.europe-west1.firebasedatabase.app/').ref('/users').push();

    await ref
    .set({
      email:user_sign_in.user.email,
      username:user_sign_in.user.email,
      description:'',
      askBeforeStick:false,
    })
  }
}