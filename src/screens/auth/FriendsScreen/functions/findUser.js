import firestore from '@react-native-firebase/firestore';
import { setEmail, setMessage } from '../../../../store/login/loginSlice';
import { Keyboard } from 'react-native';
import auth from '@react-native-firebase/auth';
import { setFriendimage } from '../../../../store/settings/settingsSlice';
import { downloadImage } from '../../BoardScreen/functions/downloadImage';
import { searchForFriendId } from './searchForFriendId'

export const findUser = async (dispatch, friendEmailOrUsername,navigation) => {
  const currentUserEmail = auth().currentUser.email;

  const friend = await searchForFriendId(friendEmailOrUsername);

  const currentUser = await firestore()
  .collection('users')
  .where('email', '==', currentUserEmail)
  .get()

  const currentUserDoc = currentUser.docs[0]

  const currentUserUsername = currentUserDoc.data().username

  const currentUserFriends = currentUserDoc.data().friends;

  const isFriend = currentUserFriends.some(myfriend => 
    myfriend.email === friend.email);

  if (isFriend) {
    dispatch(setMessage('YOU ARE FRIENDS ALREADY'));
  } else {
    if (!friend) {
      dispatch(setMessage('USER NOT FOUND'));
      console.log('user not found');
    }
    if (friend.email === currentUserEmail) {
      dispatch(setMessage('YOU CANNOT ADD YOURSELF TO FRIENDS'));
      console.log('YOU CANNOT ADD YOURSELF TO FRIENDS');
    } else {
      console.log('friend searched');
      const fileUri = await downloadImage(friend.email)
      dispatch(setFriendimage(fileUri));
      navigation.navigate('UserBoard', {name:friend.username, friendEmail: friend.email, oldnickname:''})
    }
  }

  dispatch(setEmail(''));
  Keyboard.dismiss();
  setTimeout(() => {
    dispatch(setMessage(''));
  }, 2000);
};