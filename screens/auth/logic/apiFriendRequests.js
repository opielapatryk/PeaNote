import {Animated,Easing} from 'react-native'
import auth, { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const loadUser = async (setFriends)=>{
    try{
      const MY_EMAIL = auth().currentUser.email
      firestore()
        .collection('users')
        .where('email', '==', MY_EMAIL)
        .get()
        .then(querySnapshot =>{
          if (!querySnapshot.empty) {
            const friendRequests = querySnapshot.docs[0].data().friends_requests;
            setFriends(friendRequests);
          }
        })
    }catch(e){
      console.log(e.message)
    }
  }



export const approveFriend = async (friendEmail,index,animatedValues) =>{
    
    try {
        const MY_EMAIL = auth().currentUser.email
        firestore()
        .collection('users')
        .where('email', '==', MY_EMAIL)
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
              if(doc.data().friends.includes(MY_EMAIL)){
                console.log('includes friend');
              }else{
                console.log('does not include friend');
                firestore()
                .collection('users')
                .doc(doc.id)
                .update({
                  friends: firebase.firestore.FieldValue.arrayUnion(MY_EMAIL),
                })
                .then(() => {
                  firestore()
                  .collection('users')
                  .doc(doc.id)
                  .update({
                    friends_requests: firebase.firestore.FieldValue.arrayRemove(MY_EMAIL),
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
        console.log(error.message);
    }
  }

const animate = (index,animatedValues) => {
    Animated.timing(animatedValues[index], {
        toValue: 0,
        duration: 1000,
        easing: Easing.bounce,
        useNativeDriver: false,
    }).start();
};

export const removeReq = async (friendEmail,index,animatedValues) =>{
  const MY_EMAIL = auth().currentUser.email
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