import auth from '@react-native-firebase/auth';
import { setShowInput } from '../../../../store/settings/settingsSlice';
import { setMessage } from '../../../../store/login/loginReducer';

 export const changePassword = async ({setDeleteAccountPressed,newPassword,dispatch}) => {
  setDeleteAccountPressed(false);
    try {
      await auth().currentUser.updatePassword(newPassword)
      dispatch(setMessage('Password updated!'));
      setTimeout(() => {
        dispatch(setShowInput(false))
        dispatch(setMessage(''));
      }, 1500);
    } catch (error) {
      if (error.code === 'auth/requires-recent-login') {
        dispatch(setMessage('This operation is sensitive and requires recent authentication. Log in again before retrying this request.'));
      } else if (error.code === 'auth/weak-password'){
        dispatch(setMessage('The given password is invalid.'))
      } else{
        dispatch(setMessage(error.message))
      }
    }
  };