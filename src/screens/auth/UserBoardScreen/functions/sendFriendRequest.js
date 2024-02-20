import { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export const sendFriendRequest = async (friendEmail) => {
  const currentUserEmail = auth().currentUser.email;

  const getUserDetails = async (email) => {
    const userSnapshot = await firestore()
      .collection('users')
      .where('email', '==', email)
      .get();

      if (userSnapshot.empty) {
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

    const friendDoc = await getUserDetails(friendEmail);
    const friendUsername = friendDoc.data().username

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

    await firestore()
    .collection('users')
    .doc(currentUserDoc.id)
    .update({
        pending_requests: firebase.firestore.FieldValue.arrayUnion({
        email: friendEmail,
        username: friendUsername,
        nickname:''
        }),
    })
};