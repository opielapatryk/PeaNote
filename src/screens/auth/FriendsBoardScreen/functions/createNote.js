import { firebase } from '@react-native-firebase/auth';
import auth from '@react-native-firebase/auth';

const sendPushNotification = async (friendEmail, title, body) => {
  console.log('sending notification');
  const database = firebase.app().database('https://stickify-407810-default-rtdb.europe-west1.firebasedatabase.app/');
  const usersRef = database.ref('users');
  const recipientSnapshot = await usersRef.orderByChild('email').equalTo(friendEmail).once('value');
  const recipientData = recipientSnapshot.val();
  const friendId = Object.keys(recipientData)[0];
  const pushToken = recipientData[friendId].pushToken;

  if (pushToken) {
    await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: pushToken,
        title: title,
        body: body,
      }),
    });
    console.log('notification sent');
  }else{
    console.log('cannot sent nofiticaiton');
  }
};

export const createNote = async (content,setContent,friendEmail) => {
  const EMAIL = auth().currentUser.email
  const database = firebase.app().database('https://stickify-407810-default-rtdb.europe-west1.firebasedatabase.app/');
  const usersRef = database.ref('users');
  const userSnapshot = await usersRef.orderByChild('email').equalTo(EMAIL).once('value');
  const userData = userSnapshot.val();
  const userId = Object.keys(userData)[0];
  const USERNAME = userData[userId].username;

  const friendSnapshot = await usersRef.orderByChild('email').equalTo(friendEmail).once('value');
  const friendData = friendSnapshot.val();
  const friendId = Object.keys(friendData)[0];
  const pending = friendData[friendId].askBeforeStick;
  const friendNotes = friendData[friendId].notes || [];
  await usersRef.child(`${friendId}/notes`).set([...friendNotes, { content: content, creator: USERNAME, pending:pending }]);

  const capLetterUsername = USERNAME.charAt(0).toUpperCase() + USERNAME.slice(1);

  await sendPushNotification(friendEmail, 'Fresh note delivery! 📬', `${capLetterUsername} left note on your board, come check it out!`);

  setContent('');
};