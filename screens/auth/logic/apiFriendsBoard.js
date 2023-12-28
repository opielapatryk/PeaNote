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
      const currentUserId = await SecureStore.getItemAsync('userId');
      const currentUserResult = await axios.get(userLink(currentUserId));

      const list = currentUserResult.data.friends.filter((element) => element !== userLink(friendId));

      const resp = await axios.patch(userLink(currentUserId), {
        friends: list,
      });

      if (resp.status === 200) {
        navigation.navigate('Friends');
      }
      return resp;
    } catch (error) {
      console.log(error.message);
    }
  };