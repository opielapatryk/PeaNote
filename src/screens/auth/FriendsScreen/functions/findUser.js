import { setEmail, setMessage } from '../../../../store/login/loginSlice';
import { Keyboard } from 'react-native';
import auth from '@react-native-firebase/auth';
import {firebase} from '@react-native-firebase/database'
import { setFriendimage } from '../../../../store/settings/settingsSlice';
import { downloadImage } from '../../BoardScreen/functions/downloadImage';
import { searchForFriendId } from './searchForFriendId'

export const findUser = async (dispatch, friendEmailOrUsername,navigation) => {
  const currentUserEmail = auth().currentUser.email;

  const friend = await searchForFriendId(friendEmailOrUsername);

  const database = firebase.app().database('https://stickify-407810-default-rtdb.europe-west1.firebasedatabase.app/');
  const usersRef = database.ref('users');
  const userSnapshot = await usersRef.orderByChild('email').equalTo(currentUserEmail).once('value');
  const userData = userSnapshot.val();
  const userId = Object.keys(userData)[0];
  const currentUserFriends = userData[userId].friends
  const currentUserFriendsRequests = userData[userId].friends.filter((f)=>f.request)

  const isFriend = currentUserFriends.some(myfriend => 
    myfriend.email === friend.email);

  const sendYouRequest = currentUserFriendsRequests.some(request => 
    request.email === friend.email);
  
  if (isFriend) {
    const fileUri = await downloadImage(friend.email)
    dispatch(setFriendimage(fileUri));
    navigation.navigate('FriendsBoard', {name:friend.username, friendEmail: friend.email, oldnickname:''})
  } else {
    if(sendYouRequest){
      const fileUri = await downloadImage(friend.email)
      dispatch(setFriendimage(fileUri));
      navigation.navigate('RequestUserScreen', {name:friend.username, friendEmail: friend.email, oldnickname:''})
    }
    if (friend.email == null) {
      dispatch(setMessage('USER NOT FOUND'));
    }
    if (friend.email === currentUserEmail) {
      dispatch(setMessage('YOU CANNOT ADD YOURSELF TO FRIENDS'));
    } 
    if((friend.email !== null && friend.email !== currentUserEmail) && !sendYouRequest) {
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