import {changePendingInfo,removePendingNote} from '../../../../store/notes/boardSlice'
import { deleteNote } from './deleteNote';

export const handlePress = async (notes,dispatch,isInfo,id) => {
    {notes.forEach(note => {
        if(note.isInfo === true){
        dispatch(changePendingInfo(note.id));
        }
    });}
    
    if (isInfo) {
        deleteNote(id)
        dispatch(removePendingNote(id));
    } else {
        dispatch(changePendingInfo(id));
    }
};