import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export const loadUser = async (setFriends)=>{
  const EMAIL = auth().currentUser.email
  try{
    firestore()
      .collection('users')
      .where('email', '==', EMAIL)
      .get()
      .then(querySnapshot =>{
        if (!querySnapshot.empty) {
          const friends = querySnapshot.docs[0].data().friends;
          setFriends(friends);
        }
      })
  }catch(e){
    console.log(e.message)
  }
}
  

