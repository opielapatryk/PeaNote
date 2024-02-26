import auth, { firebase } from '@react-native-firebase/auth';

export async function sendNoteToBoard(content,creator){
  const EMAIL = auth().currentUser.email
  const database = firebase.app().database('https://stickify-407810-default-rtdb.europe-west1.firebasedatabase.app/');
  const usersRef = database.ref('users');
  const userSnapshot = await usersRef.orderByChild('email').equalTo(EMAIL).once('value');
  const userData = userSnapshot.val();
  const userId = Object.keys(userData)[0];
  const notes = userData[userId].notes

  const updatedNotes = notes.map((note) => {
    if (note.content === content && note.creator === creator) {
      return { ...note, pending: false };
    }
    return note;
  });

  await usersRef.child(`${userId}/notes`).set(updatedNotes);
}