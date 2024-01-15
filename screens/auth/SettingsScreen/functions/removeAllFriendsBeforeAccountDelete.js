import { MY_EMAIL } from "../../../constants";
import firestore from '@react-native-firebase/firestore';

export const removeAllFriendsBeforeAccountDelete = async () => {
    try {
        const querySnapshot = await firestore()
            .collection('users')
            .where('email', '==', MY_EMAIL)
            .get();

        let friendsList;

        querySnapshot.forEach(doc => {
            friendsList = doc.data().friends;
        });

        if (friendsList) {
            for (const friendEmail of friendsList) {
                const friendQuerySnapshot = await firestore()
                    .collection('users')
                    .where('email', '==', friendEmail)
                    .get();

                friendQuerySnapshot.forEach(doc => {
                    let updatedFriendsList = doc.data().friends;
                    updatedFriendsList = updatedFriendsList.filter(item => item !== MY_EMAIL);

                    firestore()
                        .collection('users')
                        .doc(doc.id)
                        .update({
                            friends: updatedFriendsList
                        });
                });
            }
        }

    } catch (error) {
        console.log('[removeAllFriendsBeforeAccountDelete]', error.message);
    }
};
