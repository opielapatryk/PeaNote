import { PendingNote } from '../components/PendingNote';
import firestore from '@react-native-firebase/firestore'
import auth, {firebase} from '@react-native-firebase/auth'

export const renderNotes = ({ item }) => {
  let nick 

  const getNickname = async () => {
    const EMAIL = auth().currentUser.email
    const currentUser = await firestore().collection('users').where('email', '==', EMAIL).get()
  
    if (currentUser.docs && currentUser.docs.length > 0) {
      const friend = currentUser.docs[0].data().friends.find(
        (friend) => friend.username === item.creator || friend.email === item.creator
      );
  
      if (friend === undefined) {
        return item.creator;
      }
      
      return friend.nickname;
    } else {
      return item.creator; // Handle the case where docs array is undefined or empty
    }
  }

  getNickname().then((nickname)=>{
    nick = nickname
  })

    return (
      <PendingNote id={item.id} isInfo={item.isInfo} content={item.text} creator={nick?nick:item.creator}/>
    );
  };