import {changePendingInfo,removePendingNote} from '../store/notes/boardSlice'
import auth, { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const handlePress = (notes,dispatch,isInfo,id) => {
    {notes.forEach(note => {
        if(note.isInfo === true){
        dispatch(changePendingInfo(note.id));
        }
    });}
    if (isInfo) {
        dispatch(changePendingInfo(id));
        dispatch(removePendingNote(id));
        deleteNote(id);
    } else {
        dispatch(changePendingInfo(id));
    }
};

const deleteNote = async (id) => {
    try {
        const MY_EMAIL = auth().currentUser.email
        
        // TAKE STICKER CONTENT AND CREATOR 
        let pending

        const result = await firestore()
        .collection('users')
        .where('email', '==', MY_EMAIL)
        .get()
    
        result.forEach(doc=>{
          pending = doc.data().pending
        })
  
        // ITERATE OVER PENDING NOTES 
  
        pending.forEach((sticker,index) => {
          index = index + 1
          if(index === id){
            creator = sticker.creator
            content = sticker.content
          }
        })

         // REMOVE STICKER FROM PENDING 
        firestore()
        .collection('users')
        .where('email', '==', MY_EMAIL)
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
      console.log(error.message);
    }
}

