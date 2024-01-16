import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export const removeAllFriendsBeforeAccountDelete = async () => {
    const EMAIL = auth().currentUser.email
    try {
        console.log('trying to remove all friends');
        const querySnapshot = await firestore()
            .collection('users')
            .where('email', '==', EMAIL)
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
        console.log('friends removed');
    } catch (error) {
        console.log('[removeAllFriendsBeforeAccountDelete]', error.message);
    }
};
