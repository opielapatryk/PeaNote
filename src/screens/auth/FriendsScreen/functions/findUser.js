import firestore from '@react-native-firebase/firestore';
import { setEmail, setMessage } from '../../../../store/login/loginSlice';
import { Keyboard } from 'react-native';
import auth from '@react-native-firebase/auth';
import { setFriendimage } from '../../../../store/settings/settingsSlice';
import { downloadImage } from '../../BoardScreen/functions/downloadImage';

export const findUser = async (dispatch, friendEmailOrUsername,navigation) => {
  const currentUserEmail = auth().currentUser.email;

  const getUserDetails = async (email) => {
    const userSnapshot = await firestore()
      .collection('users')
      .where('email', '==', email)
      .get();

      if (userSnapshot.empty) {
        const usernameSnapshot = await firestore()
          .collection('users')
          .where('username', '==', email)
          .get();
    
        if (usernameSnapshot.empty) {
          dispatch(setMessage(errorMessage));
          dispatch(setEmail(''));
          Keyboard.dismiss();
          setTimeout(() => {
            dispatch(setMessage(''));
          }, 2000);
          return null;
        }
        return usernameSnapshot.docs[0];
      }

    return userSnapshot.docs[0];
  };

  const currentUserDoc = await getUserDetails(currentUserEmail);

  if (!currentUserDoc) {
    return;
  }


  const currentUserUsername = currentUserDoc.data().username

  const currentUserFriends = currentUserDoc.data().friends;

  const isFriend = currentUserFriends.some(friend => 
    friend.email === friendEmailOrUsername || friend.username === friendEmailOrUsername
  );

  if (isFriend) {
    dispatch(setMessage('YOU ARE FRIENDS ALREADY'));
  } else {
    const friendDoc = await getUserDetails(friendEmailOrUsername, 'USER NOT FOUND');

    if (!friendDoc) {
      return;
    }

    if (friendEmailOrUsername === currentUserEmail || friendEmailOrUsername === currentUserUsername) {
      dispatch(setMessage('YOU CANNOT ADD YOURSELF TO FRIENDS'));
    } else {
      const friendemail = friendDoc.data().email
      const friendusername = friendDoc.data().username

      await downloadImage(friendemail).then((fileUri)=>{
        dispatch(setFriendimage(fileUri));
      })
      
      navigation.navigate('UserBoard', {name:friendusername, friendEmail: friendemail, oldnickname:''})
    }
  }

  dispatch(setEmail(''));
  Keyboard.dismiss();
  setTimeout(() => {
    dispatch(setMessage(''));
  }, 2000);
};