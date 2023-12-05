import { userLink, stickersLink, stickerLink } from '../../../components/Constants';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

export const createNote = async (content,setContent,setMessage,friendId) => {
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

export const removeFriend = async (navigation,friendId) => {
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