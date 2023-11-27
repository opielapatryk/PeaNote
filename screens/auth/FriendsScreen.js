import { Text,ScrollView, Button } from 'react-native'
import React, {useState,useEffect} from 'react'
import axios from 'axios'
import * as SecureStore from 'expo-secure-store';

export const FriendsScreen = ({ navigation }) => {
    const [friends,setFriends] = useState([])

    useEffect(()=>{
      const loadUser = async()=>{
        try{
          currentUserId = await SecureStore.getItemAsync('userId');

          const result = await axios.get(`http://localhost:8000/api/users/${currentUserId}`)

          // console.log(result.data);
          
          // let friends = []
          const friendsRequests = result.data.friends.map(url =>
            axios.get(url)
            .then(response => response.data)
        );
        
        // Using Promise.all to wait for all requests to resolve
          Promise.all(friendsRequests)
            .then(friendsData => {
                setFriends(friendsData)
            })
            .catch(error => {
                console.error('Error fetching friends:', error);
            });
        
          
          return result
        }catch(e){
          console.log(e.message)
        }
      }
      loadUser()
    },[])
  
    return (
      <ScrollView>
        <Button title='ADD NEW FRIEND'/>
        <Text>Friends:</Text>
        <ScrollView>
          {friends.map((friend)=>(
            <Button key={friend.id} title={friend.email} onPress={() => navigation.navigate('FriendsBoard')}/>
          ))}
        </ScrollView>
      </ScrollView>
  
    );
}

export default FriendsScreen