import auth, { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export async function deleteNote(content,creator){
    const EMAIL = auth().currentUser.email

    // get current user collection to take action on in next step
    const getUserByEmail = await firestore()
    .collection('users')
    .where('email', '==', EMAIL)
    .get()

    getUserByEmail.forEach(doc=>{
        firestore()
        .collection('users')
        .doc(doc.id)
        .update({
            pending: firebase.firestore.FieldValue.arrayRemove({
                content: content,
                creator: creator,
            }),
        })
    })
}