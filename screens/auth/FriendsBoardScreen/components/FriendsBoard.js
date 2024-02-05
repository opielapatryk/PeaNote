import React, { useState } from 'react';
import { Text, TextInput, View, Pressable, Keyboard,  TouchableWithoutFeedback } from 'react-native';
import {createNote} from '../functions/createNote'
import {removeFriend} from '../functions/removeFriend'
import {styles} from '../../../../assets/styles/styles'
import { useDispatch } from 'react-redux';

const FriendsBoard = ({ route, navigation }) => {
  const { friendEmail } = route.params;
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');
  const dispatch = useDispatch()

  return (
    <TouchableWithoutFeedback 
    onPress={() => Keyboard.dismiss()}>
      <View style={styles.friendsboard}>
        <View>
          <TextInput style={styles.friendsTextInput} placeholder={message?message:"NEW NOTE"} value={content} onChangeText={text=>setContent(text)} autoCapitalize="sentences"
          autoCorrect={false} maxLength={100} multiline/>

          <Pressable style={styles.friendsHeaderRequest} onPress={()=>createNote(content,setContent,setMessage,friendEmail)}><Text style={styles.removeFriendText}>CREATE NOTE</Text></Pressable>
          
        </View>


        <Pressable style={styles.deleteAccountButton} onPress={()=>removeFriend(navigation,friendEmail,dispatch)}><Text style={styles.deleteAccountText}>REMOVE FRIEND</Text></Pressable>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default FriendsBoard;
