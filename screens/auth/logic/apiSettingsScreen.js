import { userLink } from '../../../components/Constants';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { removeNote } from '../../../store/notes/boardSlice';

export const checkIsAskBeforeStickingNoteFlagOff = async (setAskBeforeStickingNoteFlag) => {
    try {
      let userID = await SecureStore.getItemAsync('userId');
      const resp = await axios.get(userLink(userID));
      const data = resp.data.askBeforeStick;
      setAskBeforeStickingNoteFlag(data ? true : false);
    } catch (error) {
      console.log(error.message);
    }
  };

 export const deleteAccount = async (signOut,notes,dispatchRedux) => {
    try {
      let userID = await SecureStore.getItemAsync('userId');
      const resp = await axios.delete(userLink(userID));

      if (resp.status === 204) {
        signOut();
        notes.forEach((sticker) => dispatchRedux(removeNote(sticker.id)));
      }
    } catch (error) {
      console.log(error.message);
    }
  };

 export const changePassword = async (setConfirmAccountDelete,oldPassword,newPassword,setMessage,setShowInput) => {
    setConfirmAccountDelete(false);
    try {
      const token = await SecureStore.getItemAsync('userToken');
      const resp = await axios.put(
        'http://localhost:8000/update_password',
        {
          old_password: oldPassword,
          new_password: newPassword,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        }
      );

      if (resp.status && resp.status === 204) {
        setMessage('Password updated!');
      }
      setShowInput(true);
    } catch (error) {
      if (error) {
        setMessage('Something went wrong! Try providing a different password!');
      }
      console.log(error.message);
    }
  };

  export const askBeforeStick = async (setAskBeforeStickingNoteFlag,setMessage) => {
    try {
      let userID = await SecureStore.getItemAsync('userId');
      const resp = await axios.get(userLink(userID));
      const data = resp.data.askBeforeStick;
      const patchRequest = await axios.patch(userLink(userID), {
        askBeforeStick: !data,
      });

      if (patchRequest.status && patchRequest.status === 200) {
        setAskBeforeStickingNoteFlag(data ? false : true);
      }
    } catch (error) {
      setMessage('Something went wrong! Try again later..');
      console.log(error.message);
    }
  };

  export const removeNotesFromReduxStore = async (notes,dispatchRedux) => {
    await Promise.all(notes.map((sticker) => dispatchRedux(removeNote(sticker.id))));
  };