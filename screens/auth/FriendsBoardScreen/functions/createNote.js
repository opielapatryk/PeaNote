import { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export const createNote = async (content,setContent,setMessage,friendEmail,username) => {

  const EMAIL = auth().currentUser.email
  
  let USERNAME
  
  const getUserByEmail = await firestore()
      .collection('users')
      .where('email', '==', EMAIL)
      .get()

  getUserByEmail.forEach(doc => {
    USERNAME = doc.data().username
  })

  if (content !== '') {
    const getFriendByEmail = await firestore()
      .collection('users')
      .where('email', '==', friendEmail)
      .get()
      
      getFriendByEmail.forEach(doc => {
          listKey = doc.data().askBeforeStick ? 'pending' : 'stickersOnBoard'

          firestore()
          .collection('users')
          .doc(doc.id)
          .update({
            [listKey]: firebase.firestore.FieldValue.arrayUnion({
              content: content,
              creator: USERNAME,
            }),
          })
          
        })

      setMessage('NOTE SENT CORRECTLY');
      setContent('');
      setTimeout(() => {
        setMessage('')
      }, 2000);
    }else {
      setMessage('NOTE CANNOT BE EMPTY');
      setTimeout(() => {
        setMessage('')
      }, 2000);
    }
  };