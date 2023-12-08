import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { userLink } from '../../../components/Constants';
import {addNote,changeInfo,addPendingNote} from '../../../store/notes/boardSlice';

export const fetchNotes = async (dispatch) => {  
  try {
    const userToken = await SecureStore.getItemAsync('userToken');
    const currentUserId = await SecureStore.getItemAsync('userId');

    const result = await axios.get(userLink(currentUserId), {
      headers: {
        Authorization: userToken,
      },
    });

    await fetchAndDispatchStickers(result.data.stickersOnBoard, dispatch, addNote);
    await fetchAndDispatchStickers(result.data.pending, dispatch, addPendingNote);
    
    return result;
  } catch (error) {
    console.log(error.message);
  }
};

const fetchAndDispatchStickers = async (urls, dispatch, addNoteAction) => {
  const stickersRequest = urls.map(url =>
    axios.get(url)
      .then(response => response.data)
  );

  const stickersData = await Promise.all(stickersRequest);
  stickersData.forEach(sticker => dispatch(addNoteAction({ id: sticker.id, text: sticker.content, isInfo: false })));
};

export const checkThenChangeInfo = (dispatch, notes) => {
    notes.map((note) => {
      if(note.isInfo === true)
      {
        dispatch(changeInfo(note.id))
      }
    })
  }