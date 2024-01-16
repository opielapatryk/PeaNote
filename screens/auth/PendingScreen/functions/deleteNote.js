import auth, { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const deleteNote = async (id) => {

  let numberOfDeleted = 0
  const EMAIL = auth().currentUser.email

  try {
      let pending
      let content
      let creator

      const result = await firestore()
          .collection('users')
          .where('email', '==', EMAIL)
          .get()

      result.forEach(doc=>{
          pending = doc.data().pending
      })

      pending.forEach((sticker,index) => {
          index = index + 1
          let sum = id - numberOfDeleted
          if(index === sum){
            // take creator and content from clicked pending note
            creator = sticker.creator
            content = sticker.content
          }
      })

      numberOfDeleted++

      await firestore()
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
              }).then(()=>{console.log('note removed from firestore');})
          })
      })

      
  } catch (error) {
      console.log('[funcPendingNote.js] ', error.message);
  }
}