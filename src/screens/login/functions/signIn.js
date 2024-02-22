import auth from '@react-native-firebase/auth';
import { GoogleSignin} from '@react-native-google-signin/google-signin';
import firestore from '@react-native-firebase/firestore';

export const signIn = async ()=>{
  const {idToken} = await GoogleSignin.signIn()
  const googleCredential = auth.GoogleAuthProvider.credential(idToken)
  const user_sign_in = await auth().signInWithCredential(googleCredential)

  if(user_sign_in.additionalUserInfo.isNewUser){
    user_sign_in.user.updatePassword('password')
    firestore()
    .collection('users')
    .add({
      email: user.user.email,
      username:user.user.email,
      friends: [],
      friends_requests: [],
      pending_requests: [],
      askBeforeStick: false,
      stickersOnBoard: [],
      pending: [],
      description: '',
    })
  }
}