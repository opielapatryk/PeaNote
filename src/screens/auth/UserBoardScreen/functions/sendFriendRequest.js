import { firebase } from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import { approveFriend } from '../../RequestUserScreen/functions/approveFriend';

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

export const sendFriendRequest = async (friendEmail,dispatch) => {
  const currentUserEmail = auth().currentUser.email;
  const database = firebase.app().database('https://stickify-407810-default-rtdb.europe-west1.firebasedatabase.app/');
  const usersRef = database.ref('users');

  try {
    const currentUserSnapshot = await usersRef.orderByChild('email').equalTo(currentUserEmail).once('value');
    const currentUserData = currentUserSnapshot.val();

    if (!currentUserData) {
      throw new Error('Current user not found.');
    }

    const currentUserId = Object.keys(currentUserData)[0];
    const currentUserFriends = currentUserData[currentUserId].friends || [];
    const currentUserUsername = currentUserData[currentUserId].username

    // Check if already friends
    const isAlreadyFriend = currentUserFriends.some((friend) => friend.email === friendEmail && friend.pending === false && friend.request === false);

    // Check if this user send you frined request
    const isRequest = currentUserFriends.some((friend) => friend.email === friendEmail && friend.request === true);

    const friendSnapshot = await usersRef.orderByChild('email').equalTo(friendEmail).once('value');
    const friendData = friendSnapshot.val();

    if (!friendData) {
      throw new Error('Friend not found.');
    }

    const friendUserId = Object.keys(friendData)[0];
    const friendUsername = friendData[friendUserId].username;
    const friendFriends = friendData[friendUserId].friends || [];

    if(isAlreadyFriend){
      console.log('you are friends');
    }else{
      if(isRequest){
        approveFriend(friendEmail,friendUsername,dispatch)
      }else{
        // Add friend request to friend's friends list
        await usersRef.child(`${friendUserId}/friends`).set([...friendFriends, { email: currentUserEmail, username: currentUserUsername, nickname: '', request:true, pending:false }]);
  
        // Add pending request to current user's friends list
        await usersRef.child(`${currentUserId}/friends`).set([...currentUserFriends, { email: friendEmail, username: friendUsername, nickname: '', request:false, pending: true }]);
      }
      const capLetterUsername = currentUserUsername.charAt(0).toUpperCase() + currentUserUsername.slice(1);

      sendPushNotification(friendEmail, 'New friend request! 📬', `${capLetterUsername} invited you!`);
    }
  } catch (error) {
    console.error('Error sending friend request:', error);
    throw error;
  }
};