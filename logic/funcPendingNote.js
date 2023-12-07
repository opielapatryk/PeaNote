import axios from 'axios'
import {changePendingInfo,removePendingNote} from '../store/notes/boardSlice'
import { stickerLink } from '../components/Constants';

export const handlePress = (notes,dispatch,isInfo,id) => {
    {notes.forEach(note => {
        if(note.isInfo === true){
        dispatch(changePendingInfo(note.id));
        }
    });}
    if (isInfo) {
        dispatch(changePendingInfo(id));
        dispatch(removePendingNote(id));
        deleteNote(id);
    } else {
        dispatch(changePendingInfo(id));
    }
};

const deleteNote = async (id) => {
    try {
      const result = await axios.delete(stickerLink(id))
      return result
    } catch (error) {
      console.log(error.message);
    }
}

