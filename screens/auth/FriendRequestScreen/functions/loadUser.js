import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export const loadUser = async (setFriends) => {
    const EMAIL = auth().currentUser.email

    let friendRequests
        
    const getUserByEmail = await firestore().collection('users').where('email', '==', EMAIL).get();
    
    const docs = getUserByEmail.docs;

    if (Array.isArray(docs) && docs.length > 0) {
        docs.forEach((doc) => {
            friendRequests = doc.data().friends_requests;
            setFriends(friendRequests);
        })
      }
}