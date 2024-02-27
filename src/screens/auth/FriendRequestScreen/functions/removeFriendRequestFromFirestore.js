import auth from '@react-native-firebase/auth';
import { firebase } from '@react-native-firebase/database';
import { removeRequestReducer } from '../../../../store/friends/friendsSlice';

export const removeFriendRequestFromFirestore = async (friendEmail, dispatch) => {
  const EMAIL = auth().currentUser.email;

  try {
    const database = firebase.app().database('https://stickify-407810-default-rtdb.europe-west1.firebasedatabase.app/');
    const usersRef = database.ref('users');

    // Get user by email
    const snapshot = await usersRef.orderByChild('email').equalTo(EMAIL).once('value');
    const userData = snapshot.val();

    if (userData) {
      const userId = Object.keys(userData)[0];
      
      // Remove friend request from current user
      const updatedFriendsRequests = userData[userId].friends.filter(req => req.email !== friendEmail);

      await usersRef.child(`${userId}/friends`).set(updatedFriendsRequests);

      // Remove pending request from friend's collection
      const friendSnapshot = await usersRef.orderByChild('email').equalTo(friendEmail).once('value');
      const friendData = friendSnapshot.val();

      if (friendData) {
        const friendUserId = Object.keys(friendData)[0];
        const updatedPendingRequests = friendData[friendUserId].friends?.filter(req => req.email !== EMAIL);

        await usersRef.child(`${friendUserId}/friends`).set(updatedPendingRequests);
      }
    }

    dispatch(removeRequestReducer(friendEmail));
  } catch (error) {
    console.error('Error removing friend request:', error);
  }
};
