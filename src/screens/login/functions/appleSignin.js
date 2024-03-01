import auth from '@react-native-firebase/auth';
import { appleAuth } from '@invertase/react-native-apple-authentication';

export const appleSignin = async ()=>{
      let appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation:appleAuth.Operation.LOGIN,
        requestedScopes:[appleAuth.Scope.FULL_NAME,appleAuth.Scope.EMAIL],
      })
      let { identityToken, nonce } = appleAuthRequestResponse;
      let appleCredential = auth.AppleAuthProvider.credential(identityToken, nonce)

      auth().signInWithCredential(appleCredential)
}