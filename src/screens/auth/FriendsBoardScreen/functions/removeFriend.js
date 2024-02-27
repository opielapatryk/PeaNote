import { firebase } from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import { removeFriendReducer } from '../../../../store/friends/friendsSlice';

export const removeFriend = async (navigation,friendEmail,username,nickname,dispatch) => {
  const EMAIL = auth().currentUser.email
  const database = firebase.app().database('https://stickify-407810-default-rtdb.europe-west1.firebasedatabase.app/');
  const usersRef = database.ref('users');
  const userSnapshot = await usersRef.orderByChild('email').equalTo(EMAIL).once('value');
  const userData = userSnapshot.val();
  const userId = Object.keys(userData)[0];
  const friends = userData[userId].friends.filter((f) => f.email !== friendEmail);
  await usersRef.child(`${userId}/friends`).set(friends);
  
  const friendSnapshot = await usersRef.orderByChild('email').equalTo(friendEmail).once('value');
  const friendData = friendSnapshot.val();
  const friendId = Object.keys(friendData)[0];
  const myFriendFriends = friendData[friendId].friends.filter((f) => f.email !== EMAIL);
  await usersRef.child(`${friendId}/friends`).set(myFriendFriends);
  
  dispatch(removeFriendReducer(friendEmail))
  };