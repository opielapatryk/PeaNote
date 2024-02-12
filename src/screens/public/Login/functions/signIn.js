import auth from '@react-native-firebase/auth';
import { GoogleSignin} from '@react-native-google-signin/google-signin';
import firestore from '@react-native-firebase/firestore';

export const signIn = async ()=>{
  const {idToken} = await GoogleSignin.signIn()
  const googleCredential = auth.GoogleAuthProvider.credential(idToken)
  const user_sign_in = await auth().signInWithCredential(googleCredential)

  if(user_sign_in.additionalUserInfo.isNewUser){
    firestore()
    .collection('users')
    .add({
      email: user_sign_in.user.email,
      username:user_sign_in.user.email,
      friends: [],
      friends_requests: [],
      askBeforeStick: false,
      stickersOnBoard: [],
      pending: [],
      description: '',
    })
  }
}