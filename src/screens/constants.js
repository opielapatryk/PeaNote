import { setShowInput,setShowInputUsername } from '../store/settings/settingsSlice';
import { setMessage } from '../store/login/loginSlice';

export const HANDLE_PASSWORD_CHANGE_BUTTON_PRESS = ({setDeleteAccountPressed,dispatch}) => {
    setDeleteAccountPressed(false);
    dispatch(setShowInput(true))
    dispatch(setMessage(''));
  };

  export const HANDLE_USERNAME_CHANGE_BUTTON_PRESS = ({setDeleteAccountPressed,dispatch}) => {
    setDeleteAccountPressed(false);
    dispatch(setShowInputUsername(true))
    dispatch(setMessage(''));
  };
  
export const KEY_EXTRACTOR_NOTES = (note) => note.id

export const KEY_EXTRACTOR_FRIENDS = (friend, index) => friend.id || index.toString();