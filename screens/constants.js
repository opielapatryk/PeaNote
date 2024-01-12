import auth from '@react-native-firebase/auth';

export const MY_EMAIL = auth().currentUser && auth().currentUser.email

export const TOGGLE_SWITCH = () => askBeforeStick(setAskBeforeStickingNoteFlag,setMessage)

export const HANDLE_PASSWORD_CHANGE_BUTTON_PRESS = (setConfirmAccountDelete,setShowInput,setMessage) => {
    setConfirmAccountDelete(false);
    setShowInput(false);
    setMessage('');
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