import auth from '@react-native-firebase/auth';
import {setFriends, setRequests} from '../../../../store/friends/friendsSlice'
import { fetchAndDispatchFriends } from './fetchAndDispatchFriendsAndRequests';
import { firebase } from '@react-native-firebase/database';

export const loadUser = async (dispatch)=>{
  const EMAIL = auth().currentUser.email

  const usersRef = firebase.app().database('https://stickify-407810-default-rtdb.europe-west1.firebasedatabase.app/').ref('users');

  const snapshot = await usersRef.orderByChild('email').equalTo(EMAIL).once('value');

  const userData = snapshot.val();

  const userId = Object.keys(userData)[0];

  const friendsArray = userData[userId].friends || [];

  const requests = friendsArray.filter(friend => friend.request);
  const approvedFriends = friendsArray.filter(friend => !friend.pending);

  if(approvedFriends && approvedFriends.length>0){
    fetchAndDispatchFriends(approvedFriends, dispatch, setFriends);
  }
  if(requests && requests.length>0){
    fetchAndDispatchFriends(requests, dispatch, setRequests);
  }
}