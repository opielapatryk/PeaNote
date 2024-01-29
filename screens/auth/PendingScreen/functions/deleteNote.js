import auth, { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

let numberOfDeleted = 0
export const deleteNote = async (id) => {
    const EMAIL = auth().currentUser.email

    let pending
    let content
    let creator

    const getUserByEmail = await firestore()
        .collection('users')
        .where('email', '==', EMAIL)
        .get()

        getUserByEmail.forEach(doc=>{
            pending = doc.data().pending
        })

    pending.forEach((sticker,index) => {
        index = index + 1
        let sum = id - numberOfDeleted

        if(index === sum){
            creator = sticker.creator
            content = sticker.content
        }
    })

    numberOfDeleted++

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