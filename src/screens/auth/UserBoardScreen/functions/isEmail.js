import { firebase } from '@react-native-firebase/database';

export const isEmail = async (friendEmail) =>{
  const database = firebase.app().database('https://stickify-407810-default-rtdb.europe-west1.firebasedatabase.app/');
  const usersRef = database.ref('users');

  try {
    const snapshot = await usersRef.orderByChild('email').equalTo(friendEmail).once('value');
    const userData = snapshot.val();

    return userData !== null; // Returns true if the user with the specified email exists, otherwise false
  } catch (error) {
    console.error('Error checking user existence:', error);
    throw error;
  }
  }