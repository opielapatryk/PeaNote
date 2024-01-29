import { Text,View, Pressable, TextInput,FlatList } from 'react-native'
import React, {useState,useEffect} from 'react'
import { useFocusEffect } from '@react-navigation/native';
import {getUserEmail} from '../functions/getUserEmail'
import {loadUser} from '../functions/loadUser'
import {sendFriendRequest} from '../functions/sendFriendRequest'
import {styles} from '../../../../assets/styles/styles'

export const FriendsScreen = ({ navigation }) => {
  const [friends,setFriends] = useState([])
  const [newFriendEmail, setNewFriendEmail] = useState('')
  const [buttonTitle,setButtonTitle] = useState('')
  const [message,setMessage] = useState('')
  const [doesEmailExist, setdoesEmailExist] = useState(false)
  const [firstRender, setFirstRender] = useState(true)
  const [friendReqMessage, setFriendReqMessage] = useState(false)
  
  useEffect(() => {
    getUserEmail(setdoesEmailExist,firstRender,setMessage,setButtonTitle,setFirstRender,newFriendEmail,setFriendReqMessage)
  }, [newFriendEmail]);

  useFocusEffect(
    React.useCallback(() => {
      loadUser(setFriends)
    }, [])
  );

  const renderFriends = ({ item }) => {
    return (
      <Pressable onPress={() =>navigation.navigate('FriendsBoard', {name:item, friendEmail: item})} style={styles.friendInList}><Text>{item}</Text></Pressable>
    );
  };

  return (
    <View style={styles.board}>
      <Pressable style={styles.friendsHeaderRequest} onPress={()=>navigation.navigate('Requests')}><Text style={styles.friendsHeaderRequestText}>REQUESTS</Text></Pressable>

      <TextInput style={styles.friendsTextInput} placeholder='INSERT FRIEND EMAIL' onChangeText={(newFriendEmail) => setNewFriendEmail(newFriendEmail)} value={newFriendEmail}/>

      <Pressable style={styles.friendsHeaderRequest} onPress={()=>sendFriendRequest(newFriendEmail,setNewFriendEmail,setButtonTitle,setFriendReqMessage)}><Text style={styles.friendsHeaderRequestText}>ADD</Text></Pressable>

      <Text style={styles.friendsMessage}>{message}</Text>

      {friendReqMessage&&<Text style={styles.settingsMessage}>Friend request sent!</Text>}

      <Text style={styles.friendsFriendsHeader}>FRIENDS</Text>
      <FlatList data={friends} renderItem={renderFriends} keyExtractor={(friend) => friend}/>
    </View>
  );
}

export default FriendsScreen