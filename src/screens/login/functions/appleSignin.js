import auth from '@react-native-firebase/auth';
import { appleAuth } from '@invertase/react-native-apple-authentication';
import { showModal } from '../../../store/login/loginSlice';
import {firebase} from '@react-native-firebase/database'

export const appleSignin = async (dispatch)=>{
      let appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation:appleAuth.Operation.LOGIN,
        requestedScopes:[appleAuth.Scope.FULL_NAME,appleAuth.Scope.EMAIL],
      })
      let { identityToken, nonce } = appleAuthRequestResponse;
      let appleCredential = auth.AppleAuthProvider.credential(identityToken, nonce)

      let user_sign_in = await auth().signInWithCredential(appleCredential)

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