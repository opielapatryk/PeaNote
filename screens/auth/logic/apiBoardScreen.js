import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { userLink } from '../../../components/Constants';
import {addNote,removeNote,changeInfo,addPendingNote} from '../../../store/notes/boardSlice';

// export const removeNotesFromReduxStore = async (notes,dispatch) => {
//   await notes.map((sticker) => dispatch(removeNote(sticker.id)));
// };

export const fetchNotes = async (dispatch) => {  
  try {
    const userToken = await SecureStore.getItemAsync('userToken');
    const currentUserId = await SecureStore.getItemAsync('userId');

    const result = await axios.get(userLink(currentUserId), {
      headers: {
        Authorization: userToken,
      },
    });

    const stickersRequest = result.data.stickersOnBoard.map((url) =>
      axios.get(url)
          .then((response) => response.data)
    );

    const stickersData = await Promise.all(stickersRequest)
    stickersData.forEach((sticker) => dispatch(addNote({ id: sticker.id, text: sticker.content, isInfo: false })));

    const pendingstickersRequest = result.data.pending.map(url =>
      axios.get(url)
        .then(response => response.data)
    );

    const pendingstickersData = await Promise.all(pendingstickersRequest);
    pendingstickersData.forEach(sticker => dispatch(addPendingNote({ id: sticker.id, text: sticker.content, isInfo: false })));
    

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