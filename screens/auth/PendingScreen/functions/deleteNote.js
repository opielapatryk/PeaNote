import auth, { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

let numberOfDeleted = 0
export const deleteNote = async (id) => {
    const EMAIL = auth().currentUser.email
    try {
        // TAKE STICKER CONTENT AND CREATOR 
        let pending

        const result = await firestore()
        .collection('users')
        .where('email', '==', EMAIL)
        .get()
    
        result.forEach(doc=>{
          pending = doc.data().pending
        })
  
        // ITERATE OVER PENDING NOTES 
  
        pending.forEach((sticker,index) => {
          index = index + 1
          let sum = id - numberOfDeleted
          if(index === sum){
            creator = sticker.creator
            content = sticker.content
          }
        })
        numberOfDeleted++
         // REMOVE STICKER FROM PENDING 
        firestore()
        .collection('users')
        .where('email', '==', EMAIL)
        .get()
        .then((querySnapshot)=>{
        querySnapshot.forEach(doc => {
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
        })
    } catch (error) {
      console.log('[funcPendingNote.js] ', error.message);
    }
}

