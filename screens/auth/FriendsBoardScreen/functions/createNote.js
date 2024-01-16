import { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export const createNote = async (content,setContent,setMessage,friendEmail) => {
  const EMAIL = auth().currentUser.email
    try {
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
                  creator: EMAIL,
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