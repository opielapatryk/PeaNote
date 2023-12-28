import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import {userLink,stickerLink} from '../../../components/Constants'
import {removePendingNote,changePendingInfo, addNote} from '../../../store/notes/boardSlice';
import { Animated, Easing } from 'react-native';
import auth, { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export async function sendNoteToBoard(stickerID,stickerContent,dispatch,index,animatedValues){
  const MY_EMAIL = auth().currentUser.email

  const animate = (index,addNote,removeNote) => {
    Animated.timing(animatedValues[index], {
      toValue: 0,
      duration: 1000,
      easing: Easing.bounce,
      useNativeDriver: false,
    }).start(()=>{
      if (addNote) {
        addNote();
      }
      if (removeNote) {
        removeNote();
      }
    });
  };

    try {
      // TAKE STICKER CONTENT AND CREATOR 
      let pending

      const result = await firestore()
      .collection('users')
      .where('email', '==', MY_EMAIL)
      .get();
  
      result.forEach(doc=>{
        pending = doc.data().pending
      })

      // ITERATE OVER PENDING NOTES 

      pending.forEach((sticker,index) => {
        index = index + 1
        if(index === stickerID){
          creator = sticker.creator
          content = sticker.content
        }
      })

      // ADD THIS NOTE TO NOTESONBOARD

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
            stickersOnBoard: firebase.firestore.FieldValue.arrayUnion({
              content: content,
              creator: creator,
            }),
          })
        })
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

      


      animate(index,()=>dispatch(addNote({ id: stickerID, text: content, isInfo: false })),()=>dispatch(removePendingNote(stickerID)));

    } catch (error) {
      console.log(error.message);
    }
}

export const onClickChangeInfo = (dispatch,pendingNotes) => {
  pendingNotes.map((note) => {
    if(note.isInfo === true)
    {
      dispatch(changePendingInfo(note.id))
    }
  })
}