import auth from '@react-native-firebase/auth';
import { GoogleSignin} from '@react-native-google-signin/google-signin';
import firestore from '@react-native-firebase/firestore';

export const signIn = async ()=>{
    const {idToken} = await GoogleSignin.signIn()
    const googleCredential = auth.GoogleAuthProvider.credential(idToken)
    const user_sign_in = auth().signInWithCredential(googleCredential)

    user_sign_in.then((user)=>{
      if(user.additionalUserInfo.isNewUser){
        firestore()
        .collection('users')
        .add({
          first_name: user.additionalUserInfo.profile.given_name,
          last_name: user.additionalUserInfo.profile.family_name,
          email: user.user.email,
          friends: [],
          friends_requests: [],
          askBeforeStick: false,
          stickersOnBoard: [],
          pending: []
        })
      }
    })
  }