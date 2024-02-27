import { PendingNote } from '../components/PendingNote';
import {firebase} from '@react-native-firebase/database'
import auth from '@react-native-firebase/auth'

export const renderNotes = ({ item }) => {
  let nick 

  const getNickname = async () => {
    const EMAIL = auth().currentUser.email
    const database = firebase.app().database('https://stickify-407810-default-rtdb.europe-west1.firebasedatabase.app/');
    const usersRef = database.ref('users');
    const userSnapshot = await usersRef.orderByChild('email').equalTo(EMAIL).once('value');
    const userData = userSnapshot.val();
    const userId = Object.keys(userData)[0];
    const friends = userData[userId].friends
    const friend = friends?.find(
      (friend) => friend.username === item.creator || friend.email === item.creator
    );

    if (friend === undefined) {
      return item.creator;
    }
    
    return friend.nickname;
  }

  getNickname().then((nickname)=>{
    nick = nickname
  })

    return (
      <PendingNote id={item.id} isInfo={item.isInfo} content={item.text} creator={nick?nick:item.creator}/>
    );
  };