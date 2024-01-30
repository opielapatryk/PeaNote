import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {setFriends, setRequests} from '../../../../store/friends/friendsSlice'
import { fetchAndDispatchFriendsAndRequests } from './fetchAndDispatchFriendsAndRequests';

export const loadUser = async (dispatch)=>{
  const EMAIL = auth().currentUser.email

  let friends
  let requests

  const getUserByEmail = await firestore()
    .collection('users')
    .where('email', '==', EMAIL)
    .get()
  
  const docs = getUserByEmail.docs

  if (Array.isArray(docs) && docs.length > 0) {
    docs.forEach((doc) => {
      friends = doc.data().friends;
      requests = doc.data().friends_requests;
    })
  }

  fetchAndDispatchFriendsAndRequests(friends,requests, dispatch, setFriends,setRequests);
}