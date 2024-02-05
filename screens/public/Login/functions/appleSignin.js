import auth from '@react-native-firebase/auth';
import { appleAuth } from '@invertase/react-native-apple-authentication';
import firestore from '@react-native-firebase/firestore';

export const appleSignin = async ()=>{
    const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation:appleAuth.Operation.LOGIN,
        requestedScopes:[appleAuth.Scope.FULL_NAME,appleAuth.Scope.EMAIL],
      })
  
      const { identityToken, nonce } = appleAuthRequestResponse;
      console.log(identityToken);
      console.log(nonce);
  
      const appleCredential = auth.AppleAuthProvider.credential(identityToken, nonce)
      console.log(appleCredential);
  
      const user_sign_in = await auth().signInWithCredential(appleCredential);

      if(user_sign_in.additionalUserInfo.isNewUser){
        firestore()
        .collection('users')
        .add({
          email: user_sign_in.user.email,
          friends: [],
          friends_requests: [],
          askBeforeStick: false,
          stickersOnBoard: [],
          pending: []
        })
      }
}