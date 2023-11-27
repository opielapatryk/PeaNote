import { Text,ScrollView, Button, TextInput } from 'react-native'
import React, {useState,useEffect} from 'react'
import axios from 'axios'
import * as SecureStore from 'expo-secure-store';

export const FriendsScreen = ({ navigation }) => {
    const [friends,setFriends] = useState([])
    const [newFriend,setNewFriend] = useState('')
    const [newFriendEmail, setNewFriendEmail] = useState()
    const [buttonTitle,setButtonTitle] = useState('')
    const [newFriendID, setNewFriendID] = useState(0)
    // const [currentUserId, setCurrentUserId] = useState(0)
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
  
    const searchNewFriend = async () => {
      try {
        const result = await axios.get(`http://localhost:8000/api/users/`)

        const data = result.data

        currentUserId = await SecureStore.getItemAsync('userId');
        
        data.forEach(element => {
          if (element.email === newFriendEmail && element.id != currentUserId) {
            setNewFriend(element.email);
            setNewFriendID(element.id);
            setButtonTitle('ADD')
          }else{
            setNewFriend('');
            setNewFriendID(0);
            setButtonTitle('')
          }
        });
      } catch (error) {
        console.log(error.message);
      }
      
    }

    const addNewFriend = async () => {
      try {
        const friendURL = `http://localhost:8000/api/users/${newFriendID}/`
        const userURL = `http://localhost:8000/api/users/${currentUserId}/`
        const result = await axios.get(userURL)

        let list = result.data.friends

        console.log(list);

        if (!list.includes(friendURL)) {
          list.push(friendURL);
        }

        console.log(list);
        
        await axios.patch(userURL,{
            'friends':list
        })

      //   axios.patch(`http://localhost:8000/api/users/${currentUserId}/`,{
          
      //     "friends": [
      //         "http://localhost:8000/api/users/9/",
      //         "http://localhost:8000/api/users/12/"
      //     ],
      // }).then((response) => {
      //     console.log(response.data);
      // }).catch((error) => {
      //     console.log(error);
      // })

        // let list = result.data.friends
      } catch (error) {
        console.log(error.message);
      }
      
      
    }


    return (
      <ScrollView>
        <TextInput placeholder='Insert friend email' onChangeText={(newFriendEmail) => setNewFriendEmail(newFriendEmail)} value={newFriendEmail}/>
        <Button title='SEARCH NEW FRIEND' onPress={()=>searchNewFriend()}/>
        <Text>{newFriend}</Text>
        <Button title={buttonTitle} onPress={()=>{addNewFriend()}}/>
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