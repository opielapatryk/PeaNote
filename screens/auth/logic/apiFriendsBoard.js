import auth, { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const createNote = async (content,setContent,setMessage,friendEmail) => {
    try {
      const MY_EMAIL = auth().currentUser.email
      
      if (content !== '') {
          firestore()
          .collection('users')
          .where('email', '==', friendEmail)
          .get()
          .then((querySnapshot)=>{
            querySnapshot.forEach(doc => {
              listKey = doc.data().askBeforeStick ? 'pending' : 'stickersOnBoard'

              firestore()
              .collection('users')
              .doc(doc.id)
              .update({
                [listKey]: firebase.firestore.FieldValue.arrayUnion({
                  content: content,
                  creator: MY_EMAIL,
                }),
              })
              
            })
          })
          setMessage('Note created successfully!');
          setContent('');
        }else {
          setMessage('Note cannot be empty..');
        }
        
      } 
     catch (error) {
      setMessage('Cannot create note, something went wrong..');
    }
  };

export const removeFriend = async (navigation,friendEmail) => {
    try {
      const MY_EMAIL = auth().currentUser.email
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
                friends: firebase.firestore.FieldValue.arrayRemove(friendEmail),
              })
              .then(()=>{
                navigation.navigate('Friends');
              })
            })
          })

          firestore()
          .collection('users')
          .where('email', '==', friendEmail)
          .get()
          .then((querySnapshot)=>{
            querySnapshot.forEach(doc => {
              firestore()
              .collection('users')
              .doc(doc.id)
              .update({
                friends: firebase.firestore.FieldValue.arrayRemove(MY_EMAIL),
              })
              .then(()=>{
                navigation.navigate('Friends');
              })
            })
          })
    } catch (error) {
      console.log(error.message);
    }
  };