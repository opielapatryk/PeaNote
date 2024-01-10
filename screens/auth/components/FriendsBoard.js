import React, { useState } from 'react';
import { Text, TextInput, View, Button } from 'react-native';
import {createNote,removeFriend} from '../logic/apiFriendsBoard'
import {styles} from '../../../assets/styles/styles'
const FriendsBoard = ({ route, navigation }) => {
  const { friendEmail } = route.params;
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');

  return (
    <View style={styles.board}>
      <Button title="Remove Friend" onPress={()=>removeFriend(navigation,friendEmail)} />
      <TextInput placeholder="Note.." value={content} onChangeText={(content)=>setContent(content)} />
      <Button title="Create Note" onPress={()=>createNote(content,setContent,setMessage,friendEmail)} />
      <Text>{message}</Text>
    </View>
  );
};

export default FriendsBoard;
