import axios from 'axios'
import {changeInfo,removeNote} from '../store/notes/boardSlice'
import { stickerLink } from '../components/Constants';

export const handlePress = (notes,dispatch,isInfo,id) => {
    {notes.forEach(note => {
        if(note.isInfo === true){
        dispatch(changeInfo(note.id));
        }
    });}
    if (isInfo) {
        dispatch(changeInfo(id));
        dispatch(removeNote(id));
        deleteNote(id);
    } else {
        dispatch(changeInfo(id));
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

