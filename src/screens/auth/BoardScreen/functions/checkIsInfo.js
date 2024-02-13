import {changeInfo} from '../../../../store/notes/boardSlice';

export const checkIsInfo = (dispatch, notes) => {
    notes.map((note) => {
      if(note.isInfo === true)
      {
        dispatch(changeInfo(note.id))
      }
    })
  }