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

  const renderFriends = ({ item }) => {
    return (
      <Pressable onPress={() =>navigation.navigate('FriendsBoard', {name:item, friendEmail: item})} style={styles.friendInList}><Text>{item}</Text></Pressable>
    );
  };

  return (
    <View style={styles.board}>
      <Pressable onPress={()=>navigation.navigate('Requests')}><Text style={styles.friendsHeaderRequest}>REQUESTS</Text></Pressable>
      <TextInput style={styles.friendsTextInput} placeholder='Insert friend email' onChangeText={(newFriendEmail) => setNewFriendEmail(newFriendEmail)} value={newFriendEmail}/>
      <Text style={styles.friendsMessage}>{message}</Text>
      {friendReqMessage&&<Text style={styles.settingsMessage}>Friend request sent!</Text>}
      <Pressable style={ buttonTitle && styles.friendsButton} onPress={()=>sendFriendRequest(newFriendEmail,setNewFriendEmail,setdoesEmailExist,setList,setMessage,setNewFriendEmail,setButtonTitle,setFriendReqMessage)}><Text style={!buttonTitle ? {height:0} : {fontWeight:700}}>{buttonTitle}</Text></Pressable>
      <Text style={styles.friendsFriendsHeader}>Friends:</Text>
      <FlatList data={friends} renderItem={renderFriends} keyExtractor={(friend) => friend} style={{margin:10}}/>
    </View>
  );
}

export default FriendsScreen