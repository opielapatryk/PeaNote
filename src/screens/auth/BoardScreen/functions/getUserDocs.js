import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore';

export async function getUserDocs(){
    const EMAIL = auth().currentUser.email

    const getUserByEmail = await firestore()
    .collection('users')
    .where('email', '==', EMAIL)
    .get()

    if (!getUserByEmail.empty) {
        return getUserByEmail
    }
}