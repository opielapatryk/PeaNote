import {changeInfo,removeNote} from '../../../../store/notes/boardSlice'
import {deleteNote} from './deleteNote'
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