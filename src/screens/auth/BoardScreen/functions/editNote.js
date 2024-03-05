import auth from '@react-native-firebase/auth';
import { firebase } from '@react-native-firebase/database';

const findUserByEmail = async (email) => {
  const usersRef = firebase.app().database('https://stickify-407810-default-rtdb.europe-west1.firebasedatabase.app/').ref('users');
  const snapshot = await usersRef.orderByChild('email').equalTo(email).once('value');
  
  return snapshot.val();
};

const findNoteByContentAndCreator = async (notesRef, oldContent, creator) => {
  const snapshot = await notesRef.orderByChild('content').equalTo(oldContent).once('value');
  const notes = snapshot.val();

  if (notes) {
    const noteIds = Object.keys(notes);

    for (const noteId of noteIds) {
      const note = notes[noteId];

      // Add logging for debugging
      console.log('Found note:', note);

      // Check if note exists and has the creator property
      if (note && note.creator === creator) {
        return { noteId, note };
      }
    }
  }

  return null;
};

export const editNote = async (newContent, oldContent, creator) => {
  try {
    const currentUserEmail = auth().currentUser.email;
    const userData = await findUserByEmail(currentUserEmail);

    if (userData) {
      const userId = Object.keys(userData)[0];
      const notesRef = firebase.app().database('https://stickify-407810-default-rtdb.europe-west1.firebasedatabase.app/').ref(`users/${userId}/notes`);

      const noteData = await findNoteByContentAndCreator(notesRef, oldContent, creator);

      if (noteData) {
        const { noteId } = noteData;
        await notesRef.child(`${noteId}/content`).set(newContent);
        console.log('Note edited successfully!');
      } else {
        console.warn('Note not found or creator does not match.');
      }
    } else {
      console.warn('User not found.');
    }
  } catch (error) {
    console.error('Error editing note:', error);
    throw error;
  }
};
