import { MY_EMAIL } from "../../../constants";
import firestore from '@react-native-firebase/firestore';

export const removeAllFriendsAfterAccountDelete = () => {
    try {
        firestore()
        .collection('users')
        .where('friends', 'array-contains', MY_EMAIL)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach(doc => {
                console.log(doc.data()); // Log the user data
            });
        });    
    } catch (error) {
        console.log(error.message);
    }
}