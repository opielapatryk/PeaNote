import firestore from '@react-native-firebase/firestore'
import auth, {firebase} from '@react-native-firebase/auth'

export default async (content,board) => {
    const EMAIL = auth().currentUser.email

    const user = await firestore().collection('users').where('email','==',EMAIL).get()

    // ADD STICKER TO BOARD 
    if(board==='stickersOnBoard'){
        user.forEach(doc => {
            firestore()
            .collection('users')
            .doc(doc.id)
            .update({
            stickersOnBoard: firebase.firestore.FieldValue.arrayUnion({
                content: content,
                creator: 'My note',
            }),
            })
        })
    }else{
        user.forEach(doc => {
            firestore()
            .collection('users')
            .doc(doc.id)
            .update({
            pending: firebase.firestore.FieldValue.arrayUnion({
                content: content,
                creator: "My note",
            }),
            })
        })
    }

}