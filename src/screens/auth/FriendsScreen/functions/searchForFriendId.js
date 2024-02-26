import {firebase} from '@react-native-firebase/database'

export const searchForFriendId = async (friendEmailOrUsername) => {
  let friend = {
    id: null,
    email: null,
    username: null
  }

  const friendEmailOrUsernameToLowerCase = friendEmailOrUsername.toLowerCase()

  const database = firebase.app().database('https://stickify-407810-default-rtdb.europe-west1.firebasedatabase.app/');
  const usersRef = database.ref('users');
  const userSnapshot = await usersRef.equalTo(friendEmailOrUsernameToLowerCase).once('value');
  const userData = userSnapshot.val();
  friend.id = Object.keys(userData)[0];
  friend.email = userData[friend.id].email
  friend.username = userData[friend.id].username

  return friend
};