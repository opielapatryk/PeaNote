import auth from '@react-native-firebase/auth';
import { firebase } from '@react-native-firebase/database';

export const removeAllFriendsBeforeAccountDelete = async () => {
    const EMAIL = auth().currentUser.email
    const database = firebase.app().database('https://stickify-407810-default-rtdb.europe-west1.firebasedatabase.app/');
    const usersRef = database.ref('users');
    const userSnapshot = await usersRef.orderByChild('email').equalTo(EMAIL).once('value');
    const userData = userSnapshot.val();

    if (userData) {
      const userId = Object.keys(userData)[0];
      const friends = userData[userId].friends || [];
  
      // Update usernames for each friend
      await Promise.all(
        friends.map(async (friend) => {
          const friendSnapshot = await usersRef.orderByChild('email').equalTo(friend.email).once('value');
          const friendData = friendSnapshot.val();
  
          if (friendData) {
            const friendUserId = Object.keys(friendData)[0];
            const updatedFriendFriendsList = (friendData[friendUserId].friends || []).filter((f)=> f.email !== EMAIL);
  
            // Update friend's friends list
            await usersRef.child(`${friendUserId}/friends`).set(updatedFriendFriendsList);
          }
        })
      );
    }
};