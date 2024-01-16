import auth, { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { animate } from './animate'

export const removeFriendRequestFromFirestore = async (friendEmail,index,animatedValues) =>{
  const EMAIL = auth().currentUser.email
  try {
    firestore()
    .collection('users')
    .where('email', '==', EMAIL)
    .get()
    .then(querySnapshot => {
      if(!querySnapshot.empty){
        querySnapshot.forEach(doc=>{
          if(doc.data().friends_requests.includes(friendEmail)){
            firestore()
            .collection('users')
            .doc(doc.id)
            .update({
              friends_requests: firebase.firestore.FieldValue.arrayRemove(friendEmail),
            })
            .then(() => {
              animate(index,animatedValues)
            });
          }
        })
      }else{
        console.log('error');
      }
    })
  } catch (error) {
    console.log('[removeFriendRequestFromFirestore.js] ',error.message);
  }
}