import { Text,ScrollView, Button, TextInput } from 'react-native'
import React, {useState,useEffect} from 'react'
import { useFocusEffect } from '@react-navigation/native';
import {sendFriendRequest,loadUser,getUserEmail} from '../logic/apiFriendsScreen'

export const FriendsScreen = ({ navigation }) => {
  const [friends,setFriends] = useState([])
  const [newFriendEmail, setNewFriendEmail] = useState('')
  const [buttonTitle,setButtonTitle] = useState('')
  const [message,setMessage] = useState('')
  const [doesEmailExist, setdoesEmailExist] = useState(false)
  const [list,setList] = useState([])
  const [firstRender, setFirstRender] = useState(true)
  const [friendReqMessage, setFriendReqMessage] = useState(false)
  
  useEffect(() => {
    getUserEmail(setdoesEmailExist,doesEmailExist,firstRender,setMessage,setButtonTitle,setFirstRender,list,newFriendEmail,setFriendReqMessage)
  }, [newFriendEmail]);

  useFocusEffect(
    React.useCallback(() => {
      loadUser(setFriends)
    }, [])
  );

  return (
    <ScrollView>
      <Button title='REQUESTS' onPress={()=>navigation.navigate('Requests')}/>
      <TextInput placeholder='Insert friend email' onChangeText={(newFriendEmail) => setNewFriendEmail(newFriendEmail)} value={newFriendEmail}/>
      <Text>{message}</Text>
      {friendReqMessage&&<Text>Friend request sent!</Text>}
      <Button title={buttonTitle} onPress={()=>sendFriendRequest(newFriendEmail,setNewFriendEmail,setdoesEmailExist,setList,setMessage,setNewFriendEmail,setButtonTitle,setFriendReqMessage)}/>
      <Text>Friends:</Text>
      <ScrollView>
        {friends.map((friend)=>(
          <Button key={friend} title={friend} onPress={() =>
            navigation.navigate('FriendsBoard', { friendEmail: friend})}/>
        ))}
      </ScrollView>
    </ScrollView>
  );
}

export default FriendsScreen