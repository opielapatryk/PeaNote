import auth from '@react-native-firebase/auth';
import { firebase } from '@react-native-firebase/database';

export const loadUser = async (setFriends) => {
  const EMAIL = auth().currentUser.email;

  try {
    const database = firebase.app().database('https://stickify-407810-default-rtdb.europe-west1.firebasedatabase.app/');
    const usersRef = database.ref('users');

    const snapshot = await usersRef.orderByChild('email').equalTo(EMAIL).once('value');

    const userData = snapshot.val();
    
    if (userData) {
      const userId = Object.keys(userData)[0];
      const user = userData[userId];

      const friendRequests = (user.friends || []).filter(friend => friend.request);

      setFriends(friendRequests);
    }
  } catch (error) {
    console.error('Error loading user:', error);
  }
};
