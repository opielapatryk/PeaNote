import React, { useState } from 'react';
import { Text, TextInput, View, Button } from 'react-native';
import {createNote,removeFriend} from '../logic/apiFriendsBoard'

const FriendsBoard = ({ route, navigation }) => {
  const { friendId, friendName } = route.params;
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');

  return (
    <View>
      <Button title="Remove Friend" onPress={()=>removeFriend(navigation,friendId)} />
      <Text>Welcome to {friendName ? friendName + "'s" : 'your'} board</Text>
      <TextInput placeholder="Note....." value={content} onChangeText={(content)=>setContent(content)} />
      <Button title="Create Note" onPress={()=>createNote(content,setContent,setMessage,friendId)} />
      <Text>{message}</Text>
    </View>
  );
};

export default FriendsBoard;
