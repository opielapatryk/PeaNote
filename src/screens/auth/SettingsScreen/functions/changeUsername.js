import { setShowInputUsername,setUsername } from '../../../../store/settings/settingsSlice';
import { setMessage } from '../../../../store/login/loginSlice';
import auth from '@react-native-firebase/auth';
import { firebase } from '@react-native-firebase/database';

 export const changeUsername = async ({setDeleteAccountPressed,newUsername,dispatch,setNewUsername}) => {
    setDeleteAccountPressed(false);

    const database = firebase.app().database('https://stickify-407810-default-rtdb.europe-west1.firebasedatabase.app/');
    const usersRef = database.ref('users');
    const isUsernameTaken = (await usersRef.orderByChild('username').equalTo(newUsername).once('value')).exists();

    if(isUsernameTaken){
      setNewUsername('')
      dispatch(setMessage('USERNAME IS TAKEN'));
      setTimeout(() => {
        dispatch(setShowInputUsername(false))
        dispatch(setMessage(''))
      }, 2000);
      return; 
    }

    const EMAIL = auth().currentUser.email
    const userSnapshot = await usersRef.orderByChild('email').equalTo(EMAIL).once('value');
    const userData = userSnapshot.val();

    if (userData) {
      const userId = Object.keys(userData)[0];
      const friends = userData[userId].friends || [];
  
      // Update current user's username
      await usersRef.child(`${userId}/username`).set(newUsername);
  
      // Update usernames for each friend
      await Promise.all(
        friends.map(async (friend) => {
          const friendSnapshot = await usersRef.orderByChild('email').equalTo(friend.email).once('value');
          const friendData = friendSnapshot.val();
  
          if (friendData) {
            const friendUserId = Object.keys(friendData)[0];
            const friendFriends = friendData[friendUserId].friends || [];
  
            // Find myself in the friend's friends list
            const index = friendFriends.findIndex((f) => f.email === EMAIL);
            if (index !== -1) {
              friendFriends[index].username = newUsername;
            }
  
            // Update friend's friends list
            await usersRef.child(`${friendUserId}/friends`).set(friendFriends);
          }
        })
      );
    }

    await dispatch(setUsername(newUsername))

    setNewUsername('')
    dispatch(setMessage('USERNAME UPDATED'));
    setTimeout(() => {
      dispatch(setShowInputUsername(false))
      dispatch(setMessage(''))
    }, 2000);
  };