import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export const loadUser = async (setFriends)=>{
    const EMAIL = auth().currentUser.email
    try{
        firestore()
        .collection('users')
        .where('email', '==', EMAIL)
        .get()
        .then(querySnapshot =>{
            if (!querySnapshot.empty) {
            const friendRequests = querySnapshot.docs[0].data().friends_requests;
            setFriends(friendRequests);
            }
        })
    }catch(e){
        console.log('[loadUser.js] ',e.message)
    }
}