import { appleAuth } from '@invertase/react-native-apple-authentication';
import { GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { setShowInput } from '../../../../store/settings/settingsSlice';
import { setMessage } from '../../../../store/login/loginSlice';

async function revokeSignInWithAppleToken() {
  const { authorizationCode } = await appleAuth.performRequest({
    requestedOperation: appleAuth.Operation.REFRESH,
  });

  if (!authorizationCode) {
    throw new Error('Apple Revocation failed - no authorizationCode returned');
  }

  return auth().revokeToken(authorizationCode);
}

 export const changePassword = async ({setDeleteAccountPressed,newPassword,dispatch,setNewPassword}) => {
  setDeleteAccountPressed(false);
    try {
      await auth().currentUser.updatePassword(newPassword)
      setNewPassword('')
      dispatch(setMessage('Password updated successfully'));
      setTimeout(() => {
        dispatch(setShowInput(false))
        dispatch(setMessage(''));
      }, 2000);
    } catch (error) {
      if (error.code === 'auth/requires-recent-login') {
        dispatch(setMessage('Login again before this request'));

        if (auth().currentUser.providerData[0].providerId === 'apple.com') {
          await auth().currentUser?.getIdToken?.(true)
          await revokeSignInWithAppleToken();
        }else if(auth().currentUser.providerData[0].providerId === 'google.com'){
          const {idToken} = await GoogleSignin.signIn()
          const googleCredential = auth.GoogleAuthProvider.credential(idToken)
          await auth().currentUser.reauthenticateWithCredential(googleCredential)
        }

        await auth().currentUser.updatePassword(newPassword)

        setNewPassword('')
        dispatch(setMessage('Password updated successfully'));
        setTimeout(() => {
          dispatch(setShowInput(false))
          dispatch(setMessage(''));
        }, 2000);
        
      } else if (error.code === 'auth/weak-password'){
        setNewPassword('')
        dispatch(setMessage('Password is weak'))
        setTimeout(() => {
          dispatch(setShowInput(false))
          dispatch(setMessage(''));
        }, 2000);
      } else{
        setNewPassword('')
        dispatch(setMessage(error.message))
      }
    }
  };