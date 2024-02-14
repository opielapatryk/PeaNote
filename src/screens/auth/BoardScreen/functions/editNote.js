import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const editNote = async (newContent, oldContent, creator) => {
    const EMAIL = auth().currentUser.email;

    const userQuerySnapshot = await firestore()
        .collection('users')
        .where('email', '==', EMAIL)
        .get();

    const userDoc = userQuerySnapshot.docs[0];
    const userRef = firestore().collection('users').doc(userDoc.id);

    const stickersOnBoard = userDoc.data().stickersOnBoard || [];

    const indexToUpdate = stickersOnBoard.findIndex(
        (sticker) => sticker.content === oldContent && sticker.creator === creator
    );

    if (indexToUpdate !== -1) {
        stickersOnBoard[indexToUpdate].content = newContent;

        await userRef.update({
            stickersOnBoard: stickersOnBoard,
        });
    }
};