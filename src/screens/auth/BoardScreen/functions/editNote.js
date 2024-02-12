import auth, { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const editNote = async (newContent, oldContent, creator) => {
    console.log(newContent);
    console.log(oldContent);
    console.log(creator);

    const EMAIL = auth().currentUser.email;

    const userQuerySnapshot = await firestore()
        .collection('users')
        .where('email', '==', EMAIL)
        .get();

    const userDoc = userQuerySnapshot.docs[0];
    const userRef = firestore().collection('users').doc(userDoc.id);

    // Get the current stickersOnBoard array
    const stickersOnBoard = userDoc.data().stickersOnBoard || [];

    // Find the index of the sticker to update
    const indexToUpdate = stickersOnBoard.findIndex(
        (sticker) => sticker.content === oldContent && sticker.creator === creator
    );

    // If found, update the content
    if (indexToUpdate !== -1) {
        stickersOnBoard[indexToUpdate].content = newContent;

        // Update the stickersOnBoard field in the document
        await userRef.update({
            stickersOnBoard: stickersOnBoard,
        });
    }
};