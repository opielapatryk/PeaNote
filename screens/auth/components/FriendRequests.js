import { Text,ScrollView, Button, TextInput } from 'react-native'
import {userLink,usersLink} from '../../../components/Constants'
import React, {useState,useEffect} from 'react'
import { useFocusEffect } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios'

const FriendRequests = ({ navigation }) => {
    const [friends,setFriends] = useState([])
    
    const loadUser = async ()=>{
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

    useFocusEffect(
        React.useCallback(() => {
          loadUser()
        }, [])
      );

      const approveFriend = async (friendID) =>{
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
            setFriends(newRequestsArr);
        }
    } catch (error) {
        console.log(error.message);
    }
      }
  return (
    <ScrollView>
      {friends.map((friend)=>(
          <Button key={friend.id} title={friend.email} onPress={()=>approveFriend(friend.id)}/>
        ))}
    </ScrollView>
  );
}

export default FriendRequests