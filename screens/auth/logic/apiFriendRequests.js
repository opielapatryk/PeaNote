import * as SecureStore from 'expo-secure-store';
import axios from 'axios'
import {Animated,Easing} from 'react-native'
import { userLink } from '../../../components/Constants';

export const loadUser = async (setFriends)=>{
    try{
      currentUserId = await SecureStore.getItemAsync('userId');

      const result = await axios.get(userLink(currentUserId))

      const friendsRequests = result.data.friends_requests.map(url =>
        axios.get(url)
        .then(response => response.data)
      );
    
      Promise.all(friendsRequests)
        .then(friendsData => {
            setFriends(friendsData);
        })
        .catch(error => {
          console.error('Error fetching friends:', error);
      });
      
      return result
    }catch(e){
      console.log(e.message)
    }
  }



export const approveFriend = async (friendID,index,animatedValues) =>{
    const currentUserId = await SecureStore.getItemAsync('userId');
try {
    const resp = await axios.get(userLink(currentUserId))

    let friends = resp.data.friends;
    let requests = resp.data.friends_requests;

    friends.push(userLink(friendID))

    let newRequestsArr = await requests.filter(user => user != userLink(friendID))

    const patchFriends = await axios.patch(userLink(currentUserId),{
      'friends': friends
    })

    const patchReqFriends = await axios.patch(userLink(currentUserId),{
      'friends_requests': newRequestsArr
    })

    if(patchFriends.status === 200 && patchReqFriends.status === 200){
        console.log('friend accepted');
        animate(index,animatedValues)
    }
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

export const removeReq = async (friendID,index,animatedValues) =>{

    const currentUserId = await SecureStore.getItemAsync('userId');
try {
    const resp = await axios.get(userLink(currentUserId))

    let requests = resp.data.friends_requests;

    let newRequestsArr = await requests.filter(user => user != userLink(friendID))

    const patchReqFriends = await axios.patch(userLink(currentUserId),{
      'friends_requests': newRequestsArr
    })

    if(patchReqFriends.status === 200){
        animate(index,animatedValues)
    }
} catch (error) {
    console.log(error.message);
}
  }