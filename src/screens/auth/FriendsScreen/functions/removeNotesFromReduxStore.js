import {removeNote} from '../../../../store/notes/boardSlice';

export const removeNotesFromReduxStore = async (notes,dispatch) => {
    await Promise.all(notes.map((sticker) => dispatch(removeNote(sticker.id))));
  };