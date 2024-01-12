import auth from '@react-native-firebase/auth';

export const MY_EMAIL = auth().currentUser.email
export const toggleSwitch = () => askBeforeStick(setAskBeforeStickingNoteFlag,setMessage)
export const handlePasswordChangeButtonPress = (setConfirmAccountDelete,setShowInput,setMessage) => {
    setConfirmAccountDelete(false);
    setShowInput(false);
    setMessage('');
  };