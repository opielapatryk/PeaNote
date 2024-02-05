import auth from '@react-native-firebase/auth';
import { setShowInput } from '../../../../store/settings/settingsSlice';
import { setMessage } from '../../../../store/login/loginSlice';

 export const changePassword = async ({setDeleteAccountPressed,newPassword,dispatch,setNewPassword}) => {
  setDeleteAccountPressed(false);
    try {
      await auth().currentUser.updatePassword(newPassword)
      setNewPassword('')
      dispatch(setMessage('PASSWORD UPDATED'));
      setTimeout(() => {
        dispatch(setShowInput(false))
        dispatch(setMessage(''));
      }, 2000);
    } catch (error) {
      if (error.code === 'auth/requires-recent-login') {
        setNewPassword('')
        dispatch(setMessage('LOG IN AGAIN BEFORE THIS REQUEST'));
        setTimeout(() => {
          dispatch(setShowInput(false))
          dispatch(setMessage(''));
        }, 2000);
      } else if (error.code === 'auth/weak-password'){
        setNewPassword('')
        dispatch(setMessage('THE GIVEN PASSWORD IS INVALID'))
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