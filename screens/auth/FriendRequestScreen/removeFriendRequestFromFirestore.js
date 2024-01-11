import { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { animate } from './animate'
import { MY_EMAIL } from './constants';

export const removeFriendRequestFromFirestore = async (friendEmail,index,animatedValues) =>{
  try {
    firestore()
    .collection('users')
    .where('email', '==', MY_EMAIL)
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
    console.log(error.message);
  }
}