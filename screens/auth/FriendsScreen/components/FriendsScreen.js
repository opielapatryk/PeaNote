import { Text,View, Pressable, TextInput,FlatList } from 'react-native'
import React, {useState,useEffect} from 'react'
import {getUserEmail} from '../functions/getUserEmail'
import {sendFriendRequest} from '../functions/sendFriendRequest'
import {styles} from '../../../../assets/styles/styles'
import { useSelector } from 'react-redux';

export const FriendsScreen = ({ navigation }) => {
  const {friends} = useSelector((state) => state.friends);
  const [newFriendEmail, setNewFriendEmail] = useState('')
  const [message,setMessage] = useState('')
  const [firstRender, setFirstRender] = useState(true)
  const [friendReqMessage, setFriendReqMessage] = useState(false)
  
  useEffect(() => {
    getUserEmail(firstRender,setMessage,setFirstRender,newFriendEmail,setFriendReqMessage)
  }, [newFriendEmail]);


  const renderFriends = ({ item }) => {
    return (
      <Pressable onPress={() =>navigation.navigate('FriendsBoard', {name:item, friendEmail: item})} style={styles.friendInList}><Text>{item}</Text></Pressable>
    );
  };

  return (
    <View style={styles.board}>
      <Pressable style={styles.friendsHeaderRequest} onPress={()=>navigation.navigate('Requests')}><Text style={styles.friendsHeaderRequestText}>REQUESTS</Text></Pressable>

      <TextInput style={styles.friendsTextInput} placeholder='INSERT FRIEND EMAIL' onChangeText={(newFriendEmail) => setNewFriendEmail(newFriendEmail)} value={newFriendEmail} autoCorrect={false}/>

      <Pressable style={styles.friendsHeaderRequest} onPress={()=>sendFriendRequest(newFriendEmail,setNewFriendEmail,setFriendReqMessage)}><Text style={styles.friendsHeaderRequestText}>ADD</Text></Pressable>

      <Text style={styles.friendsMessage}>{message}</Text>

      {friendReqMessage&&<Text style={styles.settingsMessage}>Friend request sent!</Text>}

      <Text style={styles.friendsFriendsHeader}>FRIENDS</Text>
      <FlatList data={friends} renderItem={renderFriends} keyExtractor={(friend) => friend}/>
    </View>
  );
}

export default FriendsScreen