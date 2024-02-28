import auth from '@react-native-firebase/auth';
import { firebase } from '@react-native-firebase/database';

export async function deleteNote(content,creator){
  const EMAIL = auth().currentUser.email

  const usersRef = firebase.app().database('https://stickify-407810-default-rtdb.europe-west1.firebasedatabase.app/').ref('users');

  const snapshot = await usersRef.orderByChild('email').equalTo(EMAIL).once('value');

  const userData = snapshot.val();

  const userId = Object.keys(userData)[0];

  // REMOVE STICKER FROM REALTIME DATABASE
  await usersRef.child(`${userId}/notes`).orderByChild('content').equalTo(content).once('value', (snapshot) => {
    snapshot.forEach((childSnapshot) => {
      const note = childSnapshot.val();

      // Check if the note has the matching creator
      if (note.creator === creator) {
        childSnapshot.ref.remove();
      }
    });
  });
}