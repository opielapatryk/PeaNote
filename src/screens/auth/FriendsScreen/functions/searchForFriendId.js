import firestore from '@react-native-firebase/firestore';

export const searchForFriendId = async (friendEmailOrUsername) => {
  let friend = {
    id: null,
    email: null,
    username: null
  }

  const friendEmailOrUsernameToLowerCase = friendEmailOrUsername.toLowerCase()

  const userSnapshot = await firestore().collection('users').get()


  userSnapshot.docs.every((doc)=>{
    if(friendEmailOrUsernameToLowerCase == doc.data().email.toLowerCase() || friendEmailOrUsernameToLowerCase == doc.data().username.toLowerCase()){
      friend.id = doc.id
      friend.email = doc.data().email
      friend.username = doc.data().username
      return false
    }
    
    return true;
  });

  return friend
};