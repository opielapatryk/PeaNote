import { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export const sendFriendRequest = async (newFriendEmail,setNewFriendEmail,setButtonTitle,setFriendReqMessage) => {
  const EMAIL = auth().currentUser.email;
    try {
        firestore()
        .collection('users')
        .where('email', '==', EMAIL)
        .get()
        .then(querySnapshot => {
          if (!querySnapshot.empty) {
            querySnapshot.forEach(doc => {
              console.log(doc.data().friends);
              if(doc.data().friends.includes(newFriendEmail)){
                console.log('includes friend');
              }else{
                console.log('does not include friend');
                firestore()
                .collection('users')
                .where('email', '==', newFriendEmail)
                .get()
                .then(querySnapshot => {
                  if(!querySnapshot.empty){
                    querySnapshot.forEach(doc=>{
                      if(doc.data().friends_requests.includes(EMAIL)){
                        console.log('request already send')
                      }else{
                        firestore()
                        .collection('users')
                        .doc(doc.id)
                        .update({
                          friends_requests: firebase.firestore.FieldValue.arrayUnion(EMAIL),
                        })
                        .then(() => {
                          setNewFriendEmail('')
                          setButtonTitle('')
                          setFriendReqMessage(true)
                        });
                      }
                    })
                  }else{
                    console.log('error');
                  }
                })
              }
            });
          }
        })
        .catch(error => {
          console.error('Error getting user:', error);
        });
    } catch (error) {
      console.log('[sendFriendRequest.js] ',error.message);
    }
  }