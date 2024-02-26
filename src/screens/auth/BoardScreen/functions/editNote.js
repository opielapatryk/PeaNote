import auth from '@react-native-firebase/auth';
import { firebase } from '@react-native-firebase/database';

export const editNote = async (newContent, oldContent, creator) => {
  const EMAIL = auth().currentUser.email;

  const usersRef = firebase.app().database('https://stickify-407810-default-rtdb.europe-west1.firebasedatabase.app/').ref('users');

  try {
    const snapshot = await usersRef.orderByChild('email').equalTo(EMAIL).once('value');

    if (snapshot.exists()) {
      const userData = snapshot.val();
      const userId = Object.keys(userData)[0];

      // EDIT NOTE IN REALTIME DATABASE
      await usersRef.child(`${userId}/notes`).orderByChild('content').equalTo(oldContent).once('value', (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          const note = childSnapshot.val();

          // Check if the note has the matching creator
          if (note.creator === creator) {
            childSnapshot.ref.update({ content: newContent });
          }
        });
      });
    } else {
      console.warn('User not found.');
    }
  } catch (error) {
    console.error('Error editing note:', error);
    throw error;
  }
};
