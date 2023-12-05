import React, { useState } from 'react';
import { Text, TextInput, View, Button } from 'react-native';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { userLink, stickersLink, stickerLink } from '../../components/Constants';

const FriendsBoard = ({ route, navigation }) => {
  const { friendId, friendName } = route.params;
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');

  const createNote = async () => {
    try {
      const currentUserId = await SecureStore.getItemAsync('userId');
      const userURL = userLink(currentUserId);

      if (content !== '') {
        const result = await axios.post(stickersLink(), {
          content: content,
          creator: userURL,
        });

        const stickerID = result.data.id;
        const friendURL = userLink(friendId);
        const resultStickers = await axios.get(friendURL);

        const listKey = resultStickers.data.askBeforeStick ? 'pending' : 'stickersOnBoard';
        let list = resultStickers.data[listKey];
        list.push(stickerLink(stickerID));

        await axios.patch(userLink(friendId), {
          [listKey]: list,
        });

        if (result.status === 201) {
          setMessage('Note created successfully!');
          setContent('');
        }
      } else {
        setMessage('Note cannot be empty..');
      }
    } catch (error) {
      console.log(error.message);
      setMessage('Cannot create note, something went wrong..');
    }
  };

  const removeFriend = async () => {
    try {
      const currentUserId = await SecureStore.getItemAsync('userId');
      const currentUserResult = await axios.get(userLink(currentUserId));

      const list = currentUserResult.data.friends.filter((element) => element !== userLink(friendId));

      const resp = await axios.patch(userLink(currentUserId), {
        friends: list,
      });

      if (resp.status === 200) {
        navigation.navigate('Friends');
      }
      return resp;
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <View>
      <Button title="Remove Friend" onPress={removeFriend} />
      <Text>Welcome to {friendName ? friendName + "'s" : 'your'} board</Text>
      <TextInput placeholder="Note....." value={content} onChangeText={(text) => setContent(text)} />
      <Button title="Create Note" onPress={createNote} />
      <Text>{message}</Text>
    </View>
  );
};

export default FriendsBoard;
