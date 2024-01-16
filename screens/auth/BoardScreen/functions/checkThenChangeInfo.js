import {changeInfo} from '../../../../src/store/notes/boardSlice';

export const checkThenChangeInfo = (dispatch, notes) => {
    notes.map((note) => {
      if(note.isInfo === true)
      {
        dispatch(changeInfo(note.id))
      }
    })
  }