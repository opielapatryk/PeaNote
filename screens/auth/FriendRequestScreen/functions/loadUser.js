import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export const loadUser = async (setFriends)=>{
    const EMAIL = auth().currentUser.email

    const getUserByEmail = await firestore()
    .collection('users')
    .where('email', '==', EMAIL)
    .get()

    
    const friendRequests = getUserByEmail.docs[0].data().friends_requests;
    setFriends(friendRequests);
}