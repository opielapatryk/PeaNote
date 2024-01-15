import auth from '@react-native-firebase/auth';
import { setShowInput } from '../../../../store/settings/settingsSlice';

 export const changePassword = async ({setDeleteAccountPressed,newPassword,setMessage,dispatch}) => {
  setDeleteAccountPressed(false);
    try {
      await auth().currentUser.updatePassword(newPassword)
      setMessage('Password updated!');
      setTimeout(() => {
        dispatch(setShowInput(false))
        setMessage('');
      }, 1500);
    } catch (error) {
      if (error.code === 'auth/requires-recent-login') {
        setMessage('This operation is sensitive and requires recent authentication. Log in again before retrying this request.');
      } else if (error.code === 'auth/weak-password'){
        setMessage('The given password is invalid.')
      } else{
        setMessage(error.message)
      }
    }
  };