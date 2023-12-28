import { Text,ScrollView, Button, TextInput } from 'react-native'
import React, {useState,useEffect} from 'react'
import { useFocusEffect } from '@react-navigation/native';
import {sendFriendRequest,addNewFriend,loadUser,getUserEmail} from '../logic/apiFriendsScreen'

export const FriendsScreen = ({ navigation }) => {
  const [friends,setFriends] = useState([])
  const [newFriendEmail, setNewFriendEmail] = useState('')
  const [buttonTitle,setButtonTitle] = useState('')
  const [message,setMessage] = useState('')
  const [doesEmailExist, setdoesEmailExist] = useState(false)
  const [list,setList] = useState([])
  const [firstRender, setFirstRender] = useState(true)
  
  useEffect(() => {
    getUserEmail(setdoesEmailExist,doesEmailExist,firstRender,setMessage,setButtonTitle,setFirstRender,list,newFriendEmail)
  }, [newFriendEmail]);

  // useFocusEffect(
  //   React.useCallback(() => {
  //     loadUser(setFriends)
  //   }, [])
  // );

  return (
    <ScrollView>
      <Button title='REQUESTS' onPress={()=>navigation.navigate('Requests')}/>
      <TextInput placeholder='Insert friend email' onChangeText={(newFriendEmail) => setNewFriendEmail(newFriendEmail)} value={newFriendEmail}/>
      {/* <Button title='SEARCH NEW FRIEND' onPress={()=>sendFriendRequest(newFriendEmail,setNewFriendEmail,setdoesEmailExist,setList)}/> */}
      <Text>{message}</Text>
      <Button title={buttonTitle} onPress={()=>sendFriendRequest(newFriendEmail,setNewFriendEmail,setdoesEmailExist,setList,setMessage)}/>
      <Text>Friends:</Text>
      <ScrollView>
        {friends.map((friend)=>(
          <Button key={friend.id} title={friend.email} onPress={() => navigation.navigate('FriendsBoard', { friendId: friend.id, friendName: friend.first_name })}/>
        ))}
      </ScrollView>
    </ScrollView>
  );
}

export default FriendsScreen