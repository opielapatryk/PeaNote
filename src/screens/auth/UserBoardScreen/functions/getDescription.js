import { isEmail } from "./isEmail";
import { firebase } from '@react-native-firebase/database';

export const getDescription = async (email) =>{
  const database = firebase.app().database('https://stickify-407810-default-rtdb.europe-west1.firebasedatabase.app/');
  const usersRef = database.ref('users');

  try {
    let snapshot;

    if (isEmail(email)) {
      // Search by email
      snapshot = await usersRef.orderByChild('email').equalTo(email).once('value');
    } else {
      // Search by username
      snapshot = await usersRef.orderByChild('username').equalTo(email).once('value');
    }

    const userData = snapshot.val();

    if (userData) {
      const userId = Object.keys(userData)[0];
      return userData[userId].description;
    }

    return null; // Return null if no user found with the given email or username
  } catch (error) {
    console.error('Error getting description:', error);
    throw error;
  }
}