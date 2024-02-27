import { setEmail, setMessage } from '../../../../store/login/loginSlice';
import { Keyboard } from 'react-native';
import auth from '@react-native-firebase/auth';
import {firebase} from '@react-native-firebase/database'
import { setFriendimage } from '../../../../store/settings/settingsSlice';
import { downloadImage } from '../../BoardScreen/functions/downloadImage';

export const findUser = async (dispatch, friendEmailOrUsername,navigation) => {
  if(friendEmailOrUsername === ''){
    return
  }

  const currentUserEmail = auth().currentUser.email;

  const friendEmailOrUsernameToLowerCase = friendEmailOrUsername.toLowerCase()
  const database = firebase.app().database('https://stickify-407810-default-rtdb.europe-west1.firebasedatabase.app/');
  const usersRef = database.ref('users');

  const emailSnapshot = await usersRef.orderByChild('email').equalTo(friendEmailOrUsernameToLowerCase).once('value');

  // Search by username
  const usernameSnapshot = await usersRef.orderByChild('username').equalTo(friendEmailOrUsernameToLowerCase).once('value');

  // Combine the results
  const combinedSnapshot = emailSnapshot.val() || {};
  Object.assign(combinedSnapshot, usernameSnapshot.val() || {});

  const friendId = Object.keys(combinedSnapshot)[0];
  const friendEmail = combinedSnapshot[friendId].email
  const friendUsername = combinedSnapshot[friendId].username

  const userSnapshot = await usersRef.orderByChild('email').equalTo(currentUserEmail).once('value');
  const userData = userSnapshot.val();
  const userId = Object.keys(userData)[0];
  const currentUserFriends = userData[userId].friends
  const currentUserFriendsRequests = userData[userId].friends?.filter((f)=>f.request)

  const isFriend = currentUserFriends?.some(myfriend => 
    myfriend.email === friendEmail);
  const sendYouRequest = currentUserFriendsRequests?.some(request => 
    request.email === friendEmail);
  
  if (isFriend) {
    const fileUri = await downloadImage(friendEmail)
    dispatch(setFriendimage(fileUri));
    navigation.navigate('FriendsBoard', {name:friendUsername, friendEmail: friendEmail, oldnickname:''})
  } else {
    if(sendYouRequest){
      const fileUri = await downloadImage(friendEmail)
      dispatch(setFriendimage(fileUri));
      navigation.navigate('RequestUserScreen', {name:friendUsername, friendEmail: friendEmail, oldnickname:''})
    }
    if (friendEmail == null) {
      dispatch(setMessage('USER NOT FOUND'));
    }
    if (friendEmail === currentUserEmail) {
      dispatch(setMessage('YOU CANNOT ADD YOURSELF TO FRIENDS'));
    } 
    if((friendEmail !== null && friendEmail !== currentUserEmail) && !sendYouRequest) {
      const fileUri = await downloadImage(friendEmail)
      dispatch(setFriendimage(fileUri));
      navigation.navigate('UserBoard', {name:friendUsername, friendEmail: friendEmail, oldnickname:''})
    }
  }
  
  dispatch(setEmail(''));
  Keyboard.dismiss();
  setTimeout(() => {
    dispatch(setMessage(''));
  }, 2000);
};