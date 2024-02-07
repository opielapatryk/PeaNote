import { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { setEmail, setMessage } from '../../../../store/login/loginSlice';
import { Keyboard } from 'react-native';

export const sendFriendRequest = async (dispatch, friendEmail) => {
  const currentUserEmail = auth().currentUser.email;

  const getUserDetails = async (email, errorMessage) => {
    const userSnapshot = await firestore()
      .collection('users')
      .where('email', '==', email)
      .get();

    if (userSnapshot.empty) {
      dispatch(setMessage(errorMessage));
      dispatch(setEmail(''));
      Keyboard.dismiss();
      setTimeout(() => {
        dispatch(setMessage(''));
      }, 2000);
      return null;
    }

    return userSnapshot.docs[0];
  };

  const currentUserDoc = await getUserDetails(currentUserEmail, '');

  if (!currentUserDoc) {
    return;
  }

  const currentUserUsername = currentUserDoc.data().username

  if (currentUserDoc.data().friends.includes(friendEmail)) {
    dispatch(setMessage('YOU ARE FRIENDS ALREADY'));
  } else {
    const friendDoc = await getUserDetails(friendEmail, 'USER NOT FOUND');

    if (!friendDoc) {
      return;
    }

    if (friendEmail === currentUserEmail) {
      dispatch(setMessage('YOU CANNOT ADD YOURSELF TO FRIENDS'));
    } else {
      await firestore()
        .collection('users')
        .doc(friendDoc.id)
        .update({
          friends_requests: firebase.firestore.FieldValue.arrayUnion({
            email: currentUserEmail,
            username: currentUserUsername,
            nickname:''
          }),
        })

      dispatch(setMessage('FRIEND REQUEST SENT SUCCESSFULLY'));
    }
  }

  dispatch(setEmail(''));
  Keyboard.dismiss();
  setTimeout(() => {
    dispatch(setMessage(''));
  }, 2000);
};
