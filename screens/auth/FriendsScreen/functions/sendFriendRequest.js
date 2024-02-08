import { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { setEmail, setMessage } from '../../../../store/login/loginSlice';
import { Keyboard } from 'react-native';

export const sendFriendRequest = async (dispatch, friendEmailOrUsername,navigation) => {
  const currentUserEmail = auth().currentUser.email;

  const getUserDetails = async (email, errorMessage) => {
    const userSnapshot = await firestore()
      .collection('users')
      .where('email', '==', email)
      .get();

      if (userSnapshot.empty) {
        // If no user is found by email, try searching by username
        const usernameSnapshot = await firestore()
          .collection('users')
          .where('username', '==', email)
          .get();
    
        if (usernameSnapshot.empty) {
          dispatch(setMessage(errorMessage));
          dispatch(setEmail(''));
          Keyboard.dismiss();
          setTimeout(() => {
            dispatch(setMessage(''));
          }, 2000);
          return null;
        }
        return usernameSnapshot.docs[0];
      }

    return userSnapshot.docs[0];
  };

  const currentUserDoc = await getUserDetails(currentUserEmail, '');

  if (!currentUserDoc) {
    return;
  }

  const currentUserUsername = currentUserDoc.data().username

  const currentUserFriends = currentUserDoc.data().friends;
  const isFriend = currentUserFriends.some(friend => 
    friend.email === friendEmailOrUsername || friend.username === friendEmailOrUsername
  );

  if (isFriend) {
    dispatch(setMessage('YOU ARE FRIENDS ALREADY'));
  } else {
    const friendDoc = await getUserDetails(friendEmailOrUsername, 'USER NOT FOUND');

    if (!friendDoc) {
      return;
    }

    if (friendEmailOrUsername === currentUserEmail || friendEmailOrUsername === currentUserUsername) {
      dispatch(setMessage('YOU CANNOT ADD YOURSELF TO FRIENDS'));
    } else {

      navigation.navigate('UserBoard', {name:friendEmailOrUsername, friendEmail: friendEmailOrUsername, oldnickname:''})
      // await firestore()
      //   .collection('users')
      //   .doc(friendDoc.id)
      //   .update({
      //     friends_requests: firebase.firestore.FieldValue.arrayUnion({
      //       email: currentUserEmail,
      //       username: currentUserUsername,
      //       nickname:''
      //     }),
      //   })

      // dispatch(setMessage('FRIEND REQUEST SENT SUCCESSFULLY'));
    }
  }

  dispatch(setEmail(''));
  Keyboard.dismiss();
  setTimeout(() => {
    dispatch(setMessage(''));
  }, 2000);
};