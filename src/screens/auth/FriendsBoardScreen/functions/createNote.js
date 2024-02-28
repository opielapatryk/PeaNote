import { firebase } from '@react-native-firebase/auth';
import auth from '@react-native-firebase/auth';

export const createNote = async (content,setContent,setMessage,friendEmail) => {
  const EMAIL = auth().currentUser.email
  const database = firebase.app().database('https://stickify-407810-default-rtdb.europe-west1.firebasedatabase.app/');
  const usersRef = database.ref('users');
  const userSnapshot = await usersRef.orderByChild('email').equalTo(EMAIL).once('value');
  const userData = userSnapshot.val();
  const userId = Object.keys(userData)[0];
  const USERNAME = userData[userId].username;

  if (content !== '') {
    const friendSnapshot = await usersRef.orderByChild('email').equalTo(friendEmail).once('value');
    const friendData = friendSnapshot.val();
    const friendId = Object.keys(friendData)[0];
    const pending = friendData[friendId].askBeforeStick;
    const friendNotes = friendData[friendId].notes || [];
    await usersRef.child(`${friendId}/notes`).set([...friendNotes, { content: content, creator: USERNAME, pending:pending }]);

    setMessage('NOTE SENT CORRECTLY');
    setContent('');
    setTimeout(() => {
      setMessage('')
    }, 2000);
  }else {
    setMessage('NOTE CANNOT BE EMPTY');
    setTimeout(() => {
      setMessage('')
    }, 2000);
  }
};