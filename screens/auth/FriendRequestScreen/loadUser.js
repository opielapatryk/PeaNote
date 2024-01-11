import { MY_EMAIL } from "./constants";
import firestore from '@react-native-firebase/firestore';

export const loadUser = async (setFriends)=>{
    try{
        firestore()
        .collection('users')
        .where('email', '==', MY_EMAIL)
        .get()
        .then(querySnapshot =>{
            if (!querySnapshot.empty) {
            const friendRequests = querySnapshot.docs[0].data().friends_requests;
            setFriends(friendRequests);
            }
        })
    }catch(e){
        console.log(e.message)
    }
}