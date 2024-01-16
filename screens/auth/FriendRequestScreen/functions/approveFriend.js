import firestore from '@react-native-firebase/firestore';
import auth, { firebase } from '@react-native-firebase/auth';
import { animate } from "./animate";

export const approveFriend = async (friendEmail,index,animatedValues) =>{
  const EMAIL = auth().currentUser.email
    try {
        firestore()
        .collection('users')
        .where('email', '==', EMAIL)
        .get()
        .then(querySnapshot => {
          if (!querySnapshot.empty) {
            querySnapshot.forEach(doc => {
              if(doc.data().friends.includes(friendEmail)){
                console.log('includes friend');
              }else{
                console.log('does not include friend');
                firestore()
                .collection('users')
                .doc(doc.id)
                .update({
                  friends: firebase.firestore.FieldValue.arrayUnion(friendEmail),
                })
                .then(() => {
                  firestore()
                  .collection('users')
                  .doc(doc.id)
                  .update({
                    friends_requests: firebase.firestore.FieldValue.arrayRemove(friendEmail),
                  })
                  .then(() => {
                    animate(index,animatedValues)
                  });
                });
                }
              })
            }
          });

          firestore()
        .collection('users')
        .where('email', '==', friendEmail)
        .get()
        .then(querySnapshot => {
          if (!querySnapshot.empty) {
            querySnapshot.forEach(doc => {
              if(doc.data().friends.includes(EMAIL)){
                console.log('includes friend');
              }else{
                console.log('does not include friend');
                firestore()
                .collection('users')
                .doc(doc.id)
                .update({
                  friends: firebase.firestore.FieldValue.arrayUnion(EMAIL),
                })
                .then(() => {
                  firestore()
                  .collection('users')
                  .doc(doc.id)
                  .update({
                    friends_requests: firebase.firestore.FieldValue.arrayRemove(EMAIL),
                  })
                  .then(() => {
                    animate(index,animatedValues)
                  });
                });
                }
              })
            }
          });
    } catch (error) {
        console.log('[approveFriend.js] ',error.message);
    }
  }