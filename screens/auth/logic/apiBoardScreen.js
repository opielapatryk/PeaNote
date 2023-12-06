import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { userLink } from '../../../components/Constants';
import {addNote,removeNote} from '../../../store/notes/boardSlice';
import {changeInfo} from '../../../store/notes/boardSlice';

export const fetchNotes = async (dispatch,notes) => {
  await notes.map((sticker) => dispatch(removeNote(sticker.id)));
  try {
    const userToken = await SecureStore.getItemAsync('userToken');
    const currentUserId = await SecureStore.getItemAsync('userId');

    const result = await axios.get(userLink(currentUserId), {
      headers: {
        Authorization: userToken,
      },
    });

    const stickersRequest = result.data.stickersOnBoard.map((url) =>
      axios.get(url).then((response) => response.data)
    );

    Promise.all(stickersRequest).then((stickersData) => {
      stickersData.forEach((sticker) =>
        dispatch(addNote({ id: sticker.id, text: sticker.content, isInfo: false }))
      );
    });

    return result;
  } catch (error) {
    console.log(error.message);
  }
};

export const checkThenChangeInfo = (dispatch, notes) => {
    notes.map((note) => {
      if(note.isInfo === true)
      {
        dispatch(changeInfo(note.id))
      }
    })
  }