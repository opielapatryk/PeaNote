import { firebase } from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

export const sendFriendRequest = async (friendEmail) => {
  const currentUserEmail = auth().currentUser.email;
  const database = firebase.app().database('https://stickify-407810-default-rtdb.europe-west1.firebasedatabase.app/');
  const usersRef = database.ref('users');

  try {
    const currentUserSnapshot = await usersRef.orderByChild('email').equalTo(currentUserEmail).once('value');
    const currentUserData = currentUserSnapshot.val();

    if (!currentUserData) {
      throw new Error('Current user not found.');
    }

    const currentUserId = Object.keys(currentUserData)[0];
    const currentUserFriends = currentUserData[currentUserId].friends || [];
    const currentUserUsername = currentUserData[currentUserId].username

    // Check if already friends
    const isAlreadyFriend = currentUserFriends.some((friend) => friend.email === friendEmail);

    if (!isAlreadyFriend) {
      const friendSnapshot = await usersRef.orderByChild('email').equalTo(friendEmail).once('value');
      const friendData = friendSnapshot.val();

      if (!friendData) {
        throw new Error('Friend not found.');
      }

      const friendUserId = Object.keys(friendData)[0];
      const friendUsername = friendData[friendUserId].username;
      const friendFriends = friendData[friendUserId].friends || [];

      // Add friend request to friend's friends list
      await usersRef.child(`${friendUserId}/friends`).set([...friendFriends, { email: currentUserEmail, username: currentUserUsername, nickname: '', request:true, pending:false }]);

      // Add pending request to current user's friends list
      await usersRef.child(`${currentUserId}/friends`).set([...currentUserFriends, { email: friendEmail, username: friendUsername, nickname: '', request:false, pending: true }]);
    } else {
      console.log('Already friends.');
    }
  } catch (error) {
    console.error('Error sending friend request:', error);
    throw error;
  }
};