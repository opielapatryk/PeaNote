import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export const removeAllFriendsBeforeAccountDelete = async () => {
    const EMAIL = auth().currentUser.email

    const getUserByEmail = await firestore()
        .collection('users')
        .where('email', '==', EMAIL)
        .get();

    let friendsList;

    getUserByEmail.forEach(doc => {
        friendsList = doc.data().friends;
    });

    if (friendsList) {
        for (const friendEmail of friendsList) {
            const getFriendByEmail = await firestore()
            .collection('users')
            .where('email', '==', friendEmail)
            .get();

            getFriendByEmail.forEach(doc => {
                let updatedFriendsList = doc.data().friends;

                updatedFriendsList = updatedFriendsList.filter(item => item !== EMAIL);

                firestore()
                .collection('users')
                .doc(doc.id)
                .update({
                    friends: updatedFriendsList
                });
            });
        }
    }
};