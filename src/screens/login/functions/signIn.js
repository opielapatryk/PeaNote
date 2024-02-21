import auth from '@react-native-firebase/auth';
import { GoogleSignin} from '@react-native-google-signin/google-signin';
import firestore from '@react-native-firebase/firestore';

export const signIn = async ()=>{
  const {idToken} = await GoogleSignin.signIn()
  const googleCredential = auth.GoogleAuthProvider.credential(idToken)

  let user_sign_in
      
  try {
    user_sign_in = await auth().signInWithEmailAndPassword('xpatrykopiela@gmail.com', 'Oopiela007');

  } catch (error) {
    user_sign_in = await auth().createUserWithEmailAndPassword('xpatrykopiela@gmail.com', 'Oopiela007');
  }
  
  auth().currentUser.linkWithCredential(googleCredential)

  if(user_sign_in.additionalUserInfo.isNewUser){
    firestore()
    .collection('users')
    .add({
      email: user_sign_in.user.email,
      username:user_sign_in.user.email,
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