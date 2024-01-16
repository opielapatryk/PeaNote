import {changePendingInfo,removePendingNote} from '../../../../store/notes/boardSlice'
import { deleteNote } from '../../BoardScreen/functions/deleteNote';

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
