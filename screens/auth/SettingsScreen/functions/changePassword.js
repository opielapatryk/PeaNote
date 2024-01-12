import auth from '@react-native-firebase/auth';

 export const changePassword = async (setConfirmAccountDelete,newPassword,setMessage) => {
    setConfirmAccountDelete(false);
    try {
      await auth().currentUser.updatePassword(newPassword)
      setMessage('Password updated!');
    } catch (error) {
      if (error) {
        setMessage('Something went wrong! Try providing a different password!');
      }
      console.log(error.message);
    }
  };

