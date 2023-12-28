import React, { useEffect, useState } from 'react';
import { Text, TextInput, View, Button } from 'react-native';
import {createNote,removeFriend} from '../logic/apiFriendsBoard'
import firestore from '@react-native-firebase/firestore';

const FriendsBoard = ({ route, navigation }) => {
  const { friendEmail } = route.params;
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');
  const [firstname,setFirstName] = useState('');

  useEffect(()=>{
    firestore()
    .collection('users')
    .where('email', '==', friendEmail)
    .get()
    .then(querySnapshot =>{
      if (!querySnapshot.empty) {
        setFirstName(querySnapshot.docs[0].data().first_name)
      }
    })
  },[])

  return (
    <View>
      <Button title="Remove Friend" onPress={()=>removeFriend(navigation,friendEmail)} />
      <Text>Welcome to {firstname ? firstname + "'s" : 'your'} board</Text>
      <TextInput placeholder="Note....." value={content} onChangeText={(content)=>setContent(content)} />
      <Button title="Create Note" onPress={()=>createNote(content,setContent,setMessage,friendEmail)} />
      <Text>{message}</Text>
    </View>
  );
};

export default FriendsBoard;
