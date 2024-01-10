import { Text,ScrollView, Pressable, TextInput } from 'react-native'
import React, {useState,useEffect} from 'react'
import { useFocusEffect } from '@react-navigation/native';
import {sendFriendRequest,loadUser,getUserEmail} from '../logic/apiFriendsScreen'
import {styles} from '../../../assets/styles/styles'
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
    <ScrollView style={styles.board}>
      <Pressable onPress={()=>navigation.navigate('Requests')}><Text style={styles.friendsHeaderRequest}>REQUESTS</Text></Pressable>
      <TextInput style={styles.friendsTextInput} placeholder='Insert friend email' onChangeText={(newFriendEmail) => setNewFriendEmail(newFriendEmail)} value={newFriendEmail}/>
      <Text style={styles.friendsMessage}>{message}</Text>
      {friendReqMessage&&<Text style={styles.settingsMessage}>Friend request sent!</Text>}
      <Pressable style={ buttonTitle && styles.friendsButton} onPress={()=>sendFriendRequest(newFriendEmail,setNewFriendEmail,setdoesEmailExist,setList,setMessage,setNewFriendEmail,setButtonTitle,setFriendReqMessage)}><Text style={!buttonTitle ? {height:0} : {fontWeight:700}}>{buttonTitle}</Text></Pressable>
      <Text style={styles.friendsFriendsHeader}>Friends:</Text>
      <ScrollView style={{margin:10}}>
        {friends.map((friend)=>(
          <Pressable key={friend} onPress={() =>navigation.navigate('FriendsBoard', {name:friend, friendEmail: friend})} style={styles.friendInList}><Text>{friend}</Text></Pressable>
        ))}
      </ScrollView>
    </ScrollView>
  );
}

export default FriendsScreen