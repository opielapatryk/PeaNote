import auth from '@react-native-firebase/auth';
import { setShowInputUsername } from '../../../../store/settings/settingsSlice';
import { setMessage } from '../../../../store/login/loginSlice';
import firestore from '@react-native-firebase/firestore';

 export const changeUsername = async ({setDeleteAccountPressed,newUsername,dispatch,setNewUsername}) => {
  setDeleteAccountPressed(false);

        const EMAIL = auth().currentUser.email

        const getUserByEmail = await firestore()
        .collection('users')
        .where('email', '==', EMAIL)
        .get()
      
        getUserByEmail.forEach(doc=>{
          firestore()
          .collection('users')
          .doc(doc.id)
          .update({
            username: newUsername,
          })
        })

      setNewUsername('')
      dispatch(setMessage('USERNAME UPDATED'));
      setTimeout(() => {
        dispatch(setShowInputUsername(false))
        dispatch(setMessage(''))
      }, 2000);
  };