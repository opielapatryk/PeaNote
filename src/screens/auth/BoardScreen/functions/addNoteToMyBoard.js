import auth from '@react-native-firebase/auth'
import { firebase } from '@react-native-firebase/database';

export default async (content,board) => {
    const EMAIL = auth().currentUser.email

    const usersRef = firebase.app().database('https://stickify-407810-default-rtdb.europe-west1.firebasedatabase.app/').ref('users');
  
    const snapshot = await usersRef.orderByChild('email').equalTo(EMAIL).once('value');
  
    const userData = snapshot.val();
    const userId = Object.keys(userData)[0];
    const notesArray = userData[userId].notes || [];


    // ADD STICKER TO BOARD
    if (board === 'stickersOnBoard') {
        const newNoteData = {
            content: content,
            creator: 'My note',
            pending: false
          };

        notesArray.push(newNoteData);
        await usersRef.child(`${userId}/notes`).set(notesArray);
    } else {
        const newNoteData = {
            content: content,
            creator: 'My note',
            pending: true
          };

        notesArray.push(newNoteData);
        await usersRef.child(`${userId}/notes`).set(notesArray);
    }

}