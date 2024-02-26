import auth from '@react-native-firebase/auth';
import { firebase } from '@react-native-firebase/database';

export const checkIsAskBeforeStickingNoteFlagOff = async () => {
  const EMAIL = auth().currentUser.email;

  const database = firebase.app().database('https://stickify-407810-default-rtdb.europe-west1.firebasedatabase.app/');
  const usersRef = database.ref('users');

  try {
    const snapshot = await usersRef.orderByChild('email').equalTo(EMAIL).once('value');
    const userData = snapshot.val();

    if (userData) {
      const userId = Object.keys(userData)[0];
      const askBeforeStick = userData[userId].askBeforeStick;

      return askBeforeStick ? true : false;
    }
  } catch (error) {
    console.error('Error checking askBeforeStick flag:', error);
    return false;
  }
};