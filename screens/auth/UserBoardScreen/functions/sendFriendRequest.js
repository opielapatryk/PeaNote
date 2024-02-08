import { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { setEmail, setMessage } from '../../../../store/login/loginSlice';

export const sendFriendRequest = async (dispatch, friendEmailOrUsername,navigation) => {
  const currentUserEmail = auth().currentUser.email;

  const getUserDetails = async (email) => {
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
          return null;
        }
        return usernameSnapshot.docs[0];
      }

    return userSnapshot.docs[0];
  };

  const currentUserDoc = await getUserDetails(currentUserEmail);

  if (!currentUserDoc) {
    return;
  }

  const currentUserUsername = currentUserDoc.data().username






    const friendDoc = await getUserDetails(friendEmailOrUsername);

    if (!friendDoc) {
      return;
    }

  
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
    

    setTimeout(() => {
        navigation.navigate('FriendsScreen');
        dispatch(setEmail(''));
        dispatch(setMessage(''));
    }, 2000);
};