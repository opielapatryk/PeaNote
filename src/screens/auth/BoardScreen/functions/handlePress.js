import {changeInfo} from '../../../../store/notes/boardSlice'

export const handlePress = (notes,dispatch,isInfo,id) => {
    {notes.forEach(note => {
        if(note.isInfo === true){
        dispatch(changeInfo(note.id));
        }
    });}

    if (!isInfo) {
        dispatch(changeInfo(id));
    } 
};