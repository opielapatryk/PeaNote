import auth from '@react-native-firebase/auth';
import { appleAuth } from '@invertase/react-native-apple-authentication';
import firestore from '@react-native-firebase/firestore';

export const appleSignin = async ()=>{
      let appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation:appleAuth.Operation.LOGIN,
        requestedScopes:[appleAuth.Scope.FULL_NAME,appleAuth.Scope.EMAIL],
      })
      let { identityToken, nonce } = appleAuthRequestResponse;
      let appleCredential = auth.AppleAuthProvider.credential(identityToken, nonce)

      let user_sign_in = await auth().signInWithCredential(appleCredential)

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