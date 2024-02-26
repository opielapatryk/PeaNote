import auth from '@react-native-firebase/auth';
import { firebase } from '@react-native-firebase/database';

export const askBeforeStick = async ({setAskBeforeStickingNoteFlag}) => {
  const EMAIL = auth().currentUser.email
  const database = firebase.app().database('https://stickify-407810-default-rtdb.europe-west1.firebasedatabase.app/');
  const usersRef = database.ref('users');
  const userSnapshot = await usersRef.orderByChild('email').equalTo(EMAIL).once('value');
  const userData = userSnapshot.val();
  const userId = Object.keys(userData)[0];
  const data = userData[userId].askBeforeStick;
  await usersRef.child(`${userId}/askBeforeStick`).set(!data);
  setAskBeforeStickingNoteFlag(data ? false : true);
};