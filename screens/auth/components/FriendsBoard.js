import React, { useState } from 'react';
import { Text, TextInput, View, Pressable } from 'react-native';
import {createNote,removeFriend} from '../logic/apiFriendsBoard'
import {styles} from '../../../assets/styles/styles'
const FriendsBoard = ({ route, navigation }) => {
  const { friendEmail } = route.params;
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');

  return (
    <View style={styles.board}>
      <Pressable onPress={()=>removeFriend(navigation,friendEmail)}><Text style={styles.friendsHeaderRequest}>Remove Friend</Text></Pressable>
      <TextInput style={styles.friendsTextInput} placeholder="Note.." value={content} onChangeText={(content)=>setContent(content)} />
      <Pressable style={styles.createNoteButton} onPress={()=>createNote(content,setContent,setMessage,friendEmail)}><Text style={styles.createNoteButtonText}>Create Note</Text></Pressable>
      <Text style={styles.settingsMessage}>{message}</Text>
    </View>
  );
};

export default FriendsBoard;
