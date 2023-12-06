import { Text,ScrollView, Button, TextInput } from 'react-native'
import React, {useState,useEffect} from 'react'
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector} from 'react-redux';
import {searchNewFriend,addNewFriend,loadUser,getUserId,removeNotesFromReduxStore} from '../logic/apiFriendsScreen'

export const FriendsScreen = ({ navigation }) => {
  const { notes } = useSelector((state)=>state.board)
  const dispatch = useDispatch()
  const [friends,setFriends] = useState([])
  const [newFriendEmail, setNewFriendEmail] = useState()
  const [buttonTitle,setButtonTitle] = useState('')
  const [newFriendID, setNewFriendID] = useState(null)
  const [message,setMessage] = useState('')
  const [doesEmailExist, setdoesEmailExist] = useState(false)
  const [list,setList] = useState([])
  const [firstRender, setFirstRender] = useState(true)

  useEffect(() => {
    getUserId(doesEmailExist,firstRender,setMessage,setButtonTitle,setFirstRender,newFriendID,list,newFriendEmail)
  }, [newFriendID]);

  useFocusEffect(
    React.useCallback(() => {
      loadUser(setFriends)
      return () => {
        removeNotesFromReduxStore(notes,dispatch)
      };
    }, [notes])
  );

  return (
    <ScrollView>
      <TextInput placeholder='Insert friend email' onChangeText={(newFriendEmail) => setNewFriendEmail(newFriendEmail)} value={newFriendEmail}/>
      <Button title='SEARCH NEW FRIEND' onPress={()=>searchNewFriend(newFriendEmail,setNewFriendID,setdoesEmailExist,setList)}/>
      <Text>{message}</Text>
      <Button title={buttonTitle} onPress={()=>addNewFriend(setFriends,newFriendID,friends)}/>
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