import { removeNote } from '../../../../store/notes/boardSlice';

export const removeNotesFromReduxStore = async (notes,dispatchRedux) => {
    await Promise.all(notes.map((sticker) => dispatchRedux(removeNote(sticker.id))));
  };