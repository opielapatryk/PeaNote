import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export const loadUser = async (setFriends)=>{
  const EMAIL = auth().currentUser.email

  const result = await firestore()
    .collection('users')
    .where('email', '==', EMAIL)
    .get()
  
  const docs = result.docs

  if (Array.isArray(docs) && docs.length > 0) {
    docs.forEach((doc) => {
      const friends = doc.data().friends;
      setFriends(friends);
    })
  }

}
  

