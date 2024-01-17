import { setShowInput } from '../store/settings/settingsSlice';
import { setMessage } from '../store/login/loginReducer';

export const HANDLE_PASSWORD_CHANGE_BUTTON_PRESS = ({setDeleteAccountPressed,dispatch}) => {
    setDeleteAccountPressed(false);
    dispatch(setShowInput(true))
    dispatch(setMessage(''));
  };
  
export const KEY_EXTRACTOR_NOTES = (note) => note.id

export const KEY_EXTRACTOR_FRIENDS = (friend, index) => friend.id || index.toString();

export const goToCreateAccount = (setCreateAccount,setMessage,setLastName,setEmail,setPassword,setFirstName)=>{
  setCreateAccount(true)
  setMessage('')
  setLastName('')
  setEmail('')
  setPassword('')
  setFirstName('')
}

export const goToLogIn = (setCreateAccount,setMessage,setLastName,setEmail,setPassword,setFirstName)=>{
  setCreateAccount(false)
  setMessage('')
  setLastName('')
  setEmail('')
  setPassword('')
  setFirstName('')
}