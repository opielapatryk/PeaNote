import React, { useState } from 'react';
import { Text, TextInput, View, Pressable } from 'react-native';
import {createNote} from '../functions/createNote'
import {removeFriend} from '../functions/removeFriend'
import {styles} from '../../../../assets/styles/styles'

const FriendsBoard = ({ route, navigation }) => {
  const { friendEmail } = route.params;
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');

  return (
    <View style={styles.friendsboard}>
      <View>
        <TextInput style={styles.friendsTextInput} placeholder="NEW NOTE" value={content} onChangeText={(content)=>setContent(content)} />

        <Pressable style={styles.friendsHeaderRequest} onPress={()=>createNote(content,setContent,setMessage,friendEmail)}><Text style={styles.removeFriendText}>CREATE NOTE</Text></Pressable>
        
        <Text style={styles.settingsMessage}>{message}</Text>
      </View>


      <Pressable style={styles.deleteAccountButton} onPress={()=>removeFriend(navigation,friendEmail)}><Text style={styles.deleteAccountText}>REMOVE FRIEND</Text></Pressable>
    </View>
  );
};

export default FriendsBoard;
